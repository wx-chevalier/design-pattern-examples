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

import java.util.concurrent.TimeUnit;

public final class Timer {
    protected HashedWheelTimer wheelTimer;
    protected int wheelIndex;
    protected long deadline;
    protected Task task;
    protected int tickIndex;
    protected long remainingRounds;
    protected TimerState state;

    public Timer(HashedWheelTimer wheelTimer) {
        this.wheelTimer = wheelTimer;
        this.state = TimerState.CANCELLED;
    }

    public Timer(HashedWheelTimer wheelTimer, long deadlineNs, Task task) {
        this.wheelTimer = wheelTimer;
        reset(deadlineNs, task);
    }

    /**
     * Reschedule the timer, reusing this {@link Timer} object.
     * This timer should be already expired or cancelled.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @throws IllegalArgumentException if this timer is active
     */
    public void rescheduleTimeout(long delay, TimeUnit unit) {
        rescheduleTimeout(delay, unit, task);
    }

    /**
     * Reschedule the timer, reusing this {@link Timer} object.
     * This timer should be already expired or cancelled.
     *
     * @param delay until timer should expire
     * @param unit  of time for {@code delay}
     * @param task  to execute when timer expires
     * @throws IllegalArgumentException if this timer is active
     */
    public void rescheduleTimeout(long delay, TimeUnit unit, Task task) {
        wheelTimer.rescheduleTimeout(delay, unit, this, task);
    }

    protected void reset(long deadline, Task task) {
        this.deadline = deadline;
        this.task = task;

        final long calculatedIndex = MathUtil.divWithRound(deadline, wheelTimer.tickDurationNs);
        final long ticks = Math.max(calculatedIndex, wheelTimer.currentTick);
        this.wheelIndex = (int)(ticks & wheelTimer.mask);
        this.remainingRounds = (calculatedIndex - wheelTimer.currentTick) / wheelTimer.wheel.length;
        this.state = TimerState.ACTIVE;
    }

    /**
     * Cancel pending timer. Idempotent.
     *
     * @return indication of success or failure
     */
    public boolean cancel() {
        if (isActive()) {
            remove();
            state = TimerState.CANCELLED;
        }

        return true;
    }

    /**
     * Is timer active or not
     *
     * @return boolean indicating if timer is active or not
     */
    public boolean isActive() {
        return TimerState.ACTIVE == state;
    }

    /**
     * Was timer cancelled or not
     *
     * @return boolean indicating if timer was cancelled or not
     */
    public boolean isCancelled() {
        return TimerState.CANCELLED == state;
    }

    /**
     * Has timer expired or not
     *
     * @return boolean indicating if timer has expired or not
     */
    public boolean isExpired() {
        return TimerState.EXPIRED == state;
    }

    /**
     * @return task associated with this timer
     */
    public Task getTask() {
        return task;
    }

    protected void remove() {
        wheelTimer.wheel[wheelIndex][tickIndex] = null;
    }

    public String toString() {
        return "Timer{" +
               "wheelIndex=\'" + wheelIndex + "\'" +
               ", tickIndex=\'" + tickIndex + "\'" +
               ", deadline=\'" + deadline + "\'" +
               ", remainingRounds=\'" + remainingRounds + "\'" +
               ", state=\'" + state + "\'" +
               ", task=\'" + task + "\'" +
               "}";
    }

    public enum TimerState {
        ACTIVE,
        CANCELLED,
        EXPIRED
    }
}