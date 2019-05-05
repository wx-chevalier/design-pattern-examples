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
/*
 *  Copyright 2014 - 2016 Real Logic Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package scheduler.hashed_wheel_timer;

import org.junit.Test;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class HashedWheelTimerTest {
    private static final long ONE_MS_OF_NS = TimeUnit.MILLISECONDS.toNanos(1);

    private long controlTimestamp;

    @Test
    public void shouldBeAbleToCalculateDelay() {
        controlTimestamp = 0;
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 512);
        assertThat(wheel.computeDelayInMs(), is(1L));
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldExceptionOnNonPowerOf2TicksPerWheel() {
        new HashedWheelTimer(100, TimeUnit.MILLISECONDS, 10);
    }

    @Test(timeout = 1000)
    public void shouldBeAbleToScheduleTimerOnEdgeOfTick() {
        controlTimestamp = 0;
        final AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 1024);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(5000, TimeUnit.MICROSECONDS, task);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return firedTimestamp.get() != -1;
            }
        });

        // this is the first tick after the timer, so it should be on this edge
        assertThat(firedTimestamp.get(), is(TimeUnit.MILLISECONDS.toNanos(5)));
    }

    @Test(timeout = 1000)
    public void shouldHandleNonZeroStartTime() {
        controlTimestamp = TimeUnit.MILLISECONDS.toNanos(100);
        final AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 1024);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(5000, TimeUnit.MICROSECONDS, task);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return firedTimestamp.get() != -1;
            }
        });

        // this is the first tick after the timer, so it should be on this edge
        assertThat(firedTimestamp.get(), is(TimeUnit.MILLISECONDS.toNanos(105)));  // relative to start time
    }

    @Test
    public void shouldHandleNanoTimeUnitTimers() {
        controlTimestamp = 0;
        final AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 1024);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(5000001, TimeUnit.NANOSECONDS, task);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return firedTimestamp.get() != -1;
            }
        });

        // this is the first tick after the timer, so it should be on this edge
        assertThat(firedTimestamp.get(), is(TimeUnit.MILLISECONDS.toNanos(5)));
    }

    @Test
    public void shouldHandleMultipleRounds() {
        controlTimestamp = 0;
        final AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 16);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(63, TimeUnit.MILLISECONDS, task);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return firedTimestamp.get() != -1;
            }
        });

        // this is the first tick after the timer, so it should be on this edge
        assertThat(firedTimestamp.get(), is(TimeUnit.MILLISECONDS.toNanos(63)));  // relative to start time
    }

    @Test
    public void shouldBeAbleToCancelTimer() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 256);
        Task task = task(wheel, firedTimestamp);

        Timer timeout = wheel.newTimeout(63, TimeUnit.MILLISECONDS, task);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(16);
            }
        });

        timeout.cancel();

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(128);
            }
        });

        assertThat(firedTimestamp.get(), is(-1L));
    }

    @Test
    public void shouldHandleExpiringTimersInPreviousTicks() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 256);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(15, TimeUnit.MILLISECONDS, task);

        controlTimestamp += TimeUnit.MILLISECONDS.toNanos(32);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(128);
            }
        });

        assertThat(firedTimestamp.get(), is(TimeUnit.MILLISECONDS.toNanos(32))); // time of first expireTimers call
    }

    @Test
    public void shouldHandleMultipleTimersInDifferentTicks() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp1 = new AtomicLong(-1);
        AtomicLong firedTimestamp2 = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 256);
        Task task1 = task(wheel, firedTimestamp1);
        Task task2 = task(wheel, firedTimestamp2);

        wheel.newTimeout(15, TimeUnit.MILLISECONDS, task1);
        wheel.newTimeout(23, TimeUnit.MILLISECONDS, task2);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(128);
            }
        });

        assertThat(firedTimestamp1.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
        assertThat(firedTimestamp2.get(), is(TimeUnit.MILLISECONDS.toNanos(23)));
    }

    @Test
    public void shouldHandleMultipleTimersInSameTickSameRound() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp1 = new AtomicLong(-1);
        AtomicLong firedTimestamp2 = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 8);
        Task task1 = task(wheel, firedTimestamp1);
        Task task2 = task(wheel, firedTimestamp2);

        wheel.newTimeout(15, TimeUnit.MILLISECONDS, task1);
        wheel.newTimeout(15, TimeUnit.MILLISECONDS, task2);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(128);
            }
        });

        assertThat(firedTimestamp1.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
        assertThat(firedTimestamp2.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
    }

    @Test
    public void shouldHandleMultipleTimersInSameTickDifferentRound() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp1 = new AtomicLong(-1);
        AtomicLong firedTimestamp2 = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 8);
        Task task1 = task(wheel, firedTimestamp1);
        Task task2 = task(wheel, firedTimestamp2);

        wheel.newTimeout(15, TimeUnit.MILLISECONDS, task1);
        wheel.newTimeout(23, TimeUnit.MILLISECONDS, task2);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() > TimeUnit.MILLISECONDS.toNanos(128);
            }
        });

        assertThat(firedTimestamp1.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
        assertThat(firedTimestamp2.get(), is(TimeUnit.MILLISECONDS.toNanos(23)));
    }

    @Test
    public void shouldHandleRescheduledTimers() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp1 = new AtomicLong(-1);
        AtomicLong firedTimestamp2 = new AtomicLong(-1);
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 8);
        Task task1 = task(wheel, firedTimestamp1);
        Task task2 = task(wheel, firedTimestamp2);

        Timer timer = wheel.newTimeout(15, TimeUnit.MILLISECONDS, task1);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() >= TimeUnit.MILLISECONDS.toNanos(50);
            }
        });

        assertTrue(timer.isExpired());
        assertFalse(timer.isActive());

        assertThat(firedTimestamp1.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
        assertThat(firedTimestamp2.get(), is(-1L));

        wheel.rescheduleTimeout(23, TimeUnit.MILLISECONDS, timer, task2);

        processTimersUntil(wheel, ONE_MS_OF_NS, new BooleanSupplier() {
            @Override
            public boolean getAsBoolean() {
                return wheel.clock().nanoTime() >= TimeUnit.MILLISECONDS.toNanos(50 + 50);
            }
        });

        assertTrue(timer.isExpired());
        assertFalse(timer.isActive());

        assertThat(firedTimestamp1.get(), is(TimeUnit.MILLISECONDS.toNanos(15)));
        assertThat(firedTimestamp2.get(), is(TimeUnit.MILLISECONDS.toNanos(23 + 50)));
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldExceptionOnReschedulingActiveTimer() {
        controlTimestamp = 0;
        final HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 8);
        Task task = new Task() {
            @Override
            public void run(Timer timer) {
                wheel.clock();
            }
        };

        Timer timer = wheel.newTimeout(15, TimeUnit.MILLISECONDS, task);
        wheel.rescheduleTimeout(23, TimeUnit.MILLISECONDS, timer);
    }

    @Test
    public void shouldReturnScheduledTimers() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 1, TimeUnit.MILLISECONDS, 8);
        Task task = task(wheel, firedTimestamp);

        Timer timer1 = wheel.newTimeout(15, TimeUnit.MILLISECONDS, task);
        Timer timer2 = wheel.newTimeout(30, TimeUnit.MILLISECONDS, task);
        Timer timer3 = wheel.newTimeout(30, TimeUnit.MILLISECONDS, task);
        Timer timer4 = wheel.newTimeout(500, TimeUnit.SECONDS, task);

        Set<Timer> scheduled = new HashSet<Timer>();
        for (Timer item: wheel.scheduled())
            scheduled.add(item);

        assertEquals(4, scheduled.size());
        assertThat(scheduled, containsInAnyOrder(timer1, timer2, timer3, timer4));
    }

    @Test
    public void executeJustInNextTick() {
        controlTimestamp = 0;
        AtomicLong firedTimestamp = new AtomicLong(-1);
        HashedWheelTimer wheel = new HashedWheelTimer(getControlTimestampClock(), 10, TimeUnit.SECONDS, 8);
        Task task = task(wheel, firedTimestamp);

        wheel.newTimeout(12, TimeUnit.SECONDS, task);

        controlTimestamp = TimeUnit.SECONDS.toNanos(10);
        assertEquals("Nothing expired on 10 timestamp. Hm... 12 ms should be on 10 bucket",
                     1, wheel.expireTimers());
        assertEquals(TimeUnit.SECONDS.toNanos(10), firedTimestamp.get());
    }

    private long processTimersUntil(HashedWheelTimer wheel, long increment, BooleanSupplier condition) {
        NanoClock clock = wheel.clock();
        long startTime = clock.nanoTime();

        while (!condition.getAsBoolean()) {
            wheel.expireTimers();
            controlTimestamp += increment;
        }

        return clock.nanoTime() - startTime;
    }

    private Task task(final HashedWheelTimer wheel, final AtomicLong firedTimestamp) {
        return new Task() {
            @Override
            public void run(Timer timer) {
                firedTimestamp.set(wheel.clock().nanoTime());
            }
        };
    }

    private NanoClock getControlTimestampClock() {
        return new NanoClock() {
            @Override
            public long nanoTime() {
                return controlTimestamp;
            }
        };
    }
}
