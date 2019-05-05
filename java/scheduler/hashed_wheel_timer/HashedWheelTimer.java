/*
 * Copyright 2016 Dmitry Spikhalskiy. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package scheduler.hashed_wheel_timer;

import java.util.Arrays;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

/**
 * Timer Wheel (NOT thread safe)
 *
 * Assumes single-writer principle and timers firing on processing thread.
 * Low (or NO) garbage.
 *
 * <h3>Implementation Details</h3>
 *
 * Based on netty's HashedTimerWheel, which is based on
 * <a href="http://cseweb.ucsd.edu/users/varghese/">George Varghese</a> and
 * Tony Lauck's paper,
 * <a href="http://cseweb.ucsd.edu/users/varghese/PAPERS/twheel.ps.Z">'Hashed
 * and Hierarchical Timing Wheels: data structures to efficiently implement a
 * timer facility'</a>. More comprehensive slides are located
 * <a href="http://www.cse.wustl.edu/~cdgill/courses/cs6874/TimingWheels.ppt">here</a>.
 *
 * Wheel is backed by arrays. Timer cancellation is O(1). Timer scheduling might be slightly
 * longer if a lot of timers are in the same tick. The underlying tick contains an array. That
 * array grows when needed, but does not currently shrink.
 *
 * Timer objects may be reused if desired, but all reuse must be done with timer cancellation,
 * expiration, and timeouts in consideration.
 *
 * <b>Caveats</b>
 *
 * Timers that expire in the same tick will not be ordered with one another. As ticks are
 * fairly large normally, this means that some timers may expire out of order.
 *
 */
public class HashedWheelTimer {
    public static final int INITIAL_TICK_DEPTH = 16;

    protected final long mask;
    protected final long startTimestampNs;
    protected final long tickDurationNs;
    protected final NanoClock clock;
    protected final Timer[][] wheel;

    /**
     * This tick still not executed
     */
    protected long currentTick = 1;

    /**
     * Construct a timer wheel for use in scheduling timers.
     *
     * @param tickDuration  of each tick of the wheel
     * @param timeUnit      for the tick duration
     * @param ticksPerWheel of the wheel. Must be a power of 2.
     */
    public HashedWheelTimer(long tickDuration, TimeUnit timeUnit, int ticksPerWheel) {
        this(new SystemNanoClock(), tickDuration, timeUnit, ticksPerWheel);
    }

    /**
     * Construct a timer wheel for use in scheduling timers.
     * <p>
     * This constructor allows a custom function to return the current time instead of {@link System#nanoTime()}.
     *
     * @param clock         to use for system time
     * @param tickDuration  of each tick of the wheel
     * @param timeUnit      for the tick duration
     * @param ticksPerWheel of the wheel. Must be a power of 2.
     */
    @SuppressWarnings("unchecked")
    public HashedWheelTimer(final NanoClock clock, final long tickDuration, final TimeUnit timeUnit, final int ticksPerWheel) {
        checkTicksPerWheel(ticksPerWheel);

        this.mask = ticksPerWheel - 1;
        this.clock = clock;
        this.startTimestampNs = clock.nanoTime();
        this.tickDurationNs = timeUnit.toNanos(tickDuration);

        if (tickDurationNs >= (Long.MAX_VALUE / ticksPerWheel)) {
            throw new IllegalArgumentException(String.format(
                    "tickDuration: %d (expected: 0 < tickDurationInNs < %d",
                    tickDuration,
                    Long.MAX_VALUE / ticksPerWheel));
        }

        wheel = new Timer[ticksPerWheel][];

        for (int i = 0; i < ticksPerWheel; i++) {
            wheel[i] = new Timer[INITIAL_TICK_DEPTH];
        }
    }

    /**
     * Return a blank {@link Timer} suitable for rescheduling.
     * <p>
     * NOTE: Appears to be a cancelled timer
     *
     * @return new blank timer
     */
    public Timer newBlankTimer() {
        return new Timer(this);
    }

    /**
     * Schedule a new timer that runs {@code task} when it expires.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param task  to execute when timer expires
     * @return {@link Timer} for a new scheduled timer
     */
    public Timer newTimeout(long delay, TimeUnit unit, Task task) {
        long deadline = nsFromStart() + unit.toNanos(delay);
        Timer timeout = new Timer(this, deadline, task);
        wheel[timeout.wheelIndex] = addTimeoutToArray(wheel[timeout.wheelIndex], timeout);
        return timeout;
    }

    /**
     * Schedule a new timer that runs {@code task} when it expires.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param task  to execute when timer expires
     * @return {@link Timer} for a new scheduled timer
     * @deprecated use {@link #newTimeout(long delay, TimeUnit unit, Task task)}
     */
    @Deprecated
    public Timer newTimeout(long delay, TimeUnit unit, final Runnable task) {
        return newTimeout(delay, unit, new Task() {
            @Override
            public void run(Timer timer) {
                task.run();
            }
        });
    }

    /**
     * Reschedule an expired timer, reusing the {@link Timer} object.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param timer to reschedule
     * @throws IllegalArgumentException if timer is active
     */
    public void rescheduleTimeout(long delay, TimeUnit unit, Timer timer) {
        rescheduleTimeout(delay, unit, timer, timer.task);
    }

    /**
     * Reschedule an expired timer, reusing the {@link Timer} object.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param timer to reschedule
     * @param task  to execute when timer expires
     * @throws IllegalArgumentException if timer is active
     */
    public void rescheduleTimeout(long delay, TimeUnit unit, Timer timer, Task task) {
        if (timer.isActive()) {
            throw new IllegalArgumentException("timer is active");
        }
        long deadlineNs = nsFromStart() + unit.toNanos(delay);
        timer.reset(deadlineNs, task);
        wheel[timer.wheelIndex] = addTimeoutToArray(wheel[timer.wheelIndex], timer);
    }


    /**
     * Reschedule an expired timer, reusing the {@link Timer} object.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param timer to reschedule
     * @param task  to execute when timer expires
     * @throws IllegalArgumentException if timer is active
     * @deprecated use {@link #rescheduleTimeout(long delay, TimeUnit unit, Timer timer, Task task)}
     */
    @Deprecated
    public void rescheduleTimeout(long delay, TimeUnit unit, Timer timer, final Runnable task) {
        rescheduleTimeout(delay, unit, timer, new Task() {
            @Override
            public void run(Timer timer) {
                task.run();
            }
        });
    }

    /**
     * Process timers and execute any expired timers.
     *
     * @return number of timers expired.
     */
    public int expireTimers() {
        int timersExpired = 0;
        long tillTick = fullTicksFromStart() + 1;

        for (long tick = currentTick; tick < tillTick; tick++) {
            timersExpired += expireTimersForTick(tick);
        }

        currentTick = tillTick;
        return timersExpired;
    }

    /**
     * Return <code>Iterable&lt;Timer&gt;</code> with scheduled but not yet executed timers.
     * This timers could be in {@link TimerState#ACTIVE} or {@link TimerState#EXPIRED} states.
     *
     * @return <code>Iterable&lt;Timer&gt;</code> with scheduled but not yet executed timers
     */
    public Iterable<Timer> scheduled() {
        return new Iterable<Timer>() {
            @Override
            public Iterator<Timer> iterator() {
                return new TimerIterator();
            }
        };
    }

    /**
     * Compute delay in milliseconds until next tick.
     *
     * @return number of milliseconds to next tick of the wheel.
     */
    public long computeDelayInMs() {
        final long deadline = tickDurationNs * currentTick;
        return (deadline - nsFromStart() + 999999) / 1000000;
    }

    /**
     * Get the {@link NanoClock} used by this timer wheel.
     *
     * @return the {@link NanoClock} used by this timer wheel.
     */
    protected NanoClock clock() {
        return clock;
    }

    protected int expireTimersForTick(long tick) {
        int timersExpired = 0;
        for (final Timer timer : wheel[(int)(tick & mask)]) {
            if (null == timer) {
                continue;
            }

            if (0 >= timer.remainingRounds) {
                timer.remove();
                timer.state = Timer.TimerState.EXPIRED;
                ++timersExpired;
                timer.task.run(timer);
            } else {
                timer.remainingRounds--;
            }
        }
        return timersExpired;
    }

    /**
     * Return the current time as number of nanoseconds since start of the wheel.
     *
     * @return number of nanoseconds since start of the wheel
     */
    protected long nsFromStart() {
        return clock.nanoTime() - startTimestampNs;
    }

    protected long fullTicksFromStart() {
        return (clock.nanoTime() - startTimestampNs) / tickDurationNs;
    }

    protected static void checkTicksPerWheel(final int ticksPerWheel) {
        if (ticksPerWheel < 2 || 1 != Integer.bitCount(ticksPerWheel)) {
            throw new IllegalArgumentException("ticksPerWheel must be a positive power of 2: ticksPerWheel=" +
                                               ticksPerWheel);
        }
    }

    protected Timer[] addTimeoutToArray(Timer[] oldArray, Timer timeout) {
        for (int i = 0; i < oldArray.length; i++) {
            if (null == oldArray[i]) {
                oldArray[i] = timeout;
                timeout.tickIndex = i;

                return oldArray;
            }
        }

        Timer[] newArray = Arrays.copyOf(oldArray, oldArray.length + 1);
        newArray[oldArray.length] = timeout;
        timeout.tickIndex = oldArray.length;

        return newArray;
    }

    protected final class TimerIterator implements Iterator<Timer> {
        private int tick = 0;
        private int tickIndex = -1;
        private boolean consumed = true;
        private boolean end = false;

        public boolean hasNext()
        {
            return !end && (!consumed || findNext() != null);
        }

        public Timer next() {
            if (end) {
                throw new NoSuchElementException();
            }

            if (consumed) {
                final Timer timer = findNext();
                if (timer == null) {
                    throw new NoSuchElementException();
                }
                consumed = true;
                return timer;
            }

            consumed = true;
            return wheel[tick][tickIndex];
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException("remove");
        }

        private Timer findNext() {
            int ticksPerWheel = (int)mask + 1;
            do {
                Timer[] timers = wheel[tick];
                int timersLength = timers.length;
                while (++tickIndex < timersLength) {
                    Timer timer = timers[tickIndex];
                    if (timer != null) {
                        consumed = false;
                        return timer;
                    }
                }
                tick++;
                tickIndex = -1;
            }
            while (tick < ticksPerWheel);
            end = true;
            return null;
        }
    }
}
