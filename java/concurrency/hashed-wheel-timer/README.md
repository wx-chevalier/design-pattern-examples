# Hashed Wheel Timer [![Build Status](https://travis-ci.org/Spikhalskiy/hashed-wheel-timer.svg?branch=master)](https://travis-ci.org/Spikhalskiy/hashed-wheel-timer) [![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.spikhalskiy/hashed-wheel-timer/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.spikhalskiy/hashed-wheel-timer)
Simple Hashed Wheel Timer implementation based on Agrona WheelTimer.

## What is it?

Hashed Wheel Timer is an approximate timer with configurable accuracy, which could be used for very efficient single-threaded execution of scheduled tasks. 

This implementation assumes single-writer principle and timers firing on processing thread.

Low (or NO) garbage.

Could be used with JDK6.

## How to get?

```xml
<dependency>
    <groupId>com.spikhalskiy</groupId>
    <artifactId>hashed-wheel-timer</artifactId>
    <version>0.3-RC1</version>
</dependency>
```

## How to use?

```java
//Create hashed wheel timer with required resolution and size
final HashedWheelTimer wheel = new HashedWheelTimer(new SystemNanoClock(), 50, TimeUnit.MILLISECONDS, 512);

/*Just for a demonstration we create executor to trigger expireTimers() call
  But you can trigger it in any way and with any frequency.
  Call to expireTimers() would execute all tasks that expired till current timestamp
  just in one calling thread.*/
ScheduledExecutorService scheduledThreadPoolExecutor = Executors.newSingleThreadScheduledExecutor();
scheduledThreadPoolExecutor.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
        wheel.expireTimers();    
    }
, 50, 50, TimeUnit.MILLISECONDS);

/*schedule our task to execution, run method of this task would be called
 by the main thread of the scheduler.*/
wheel.newTimeout(100, TimeUnit.MILLISECONDS, new Task() {
    @Override
    public void run(Timer timer) {
        ...
    }
});
```

## Implementation details

Based on Agrona's Wheel Timer, which is based on <a href="http://cseweb.ucsd.edu/users/varghese/">George Varghese</a> and Tony Lauck's paper,
<a href="http://cseweb.ucsd.edu/users/varghese/PAPERS/twheel.ps.Z">'Hashed and Hierarchical Timing Wheels: data structures to efficiently implement a timer facility'</a>.
More comprehensive slides are located <a href="http://www.cse.wustl.edu/~cdgill/courses/cs6874/TimingWheels.ppt">here</a>.

Wheel is backed by arrays. Timer cancellation is O(1). Timer scheduling might be slightly
longer if a lot of timers are in the same tick. The underlying tick contains an array. That
array grows when needed, but does not currently shrink.

Timer doesn't create any threads inside. All processing and tasks executing perform in the calling thread.

Timer objects may be reused if desired, but all reuse must be done with timer cancellation,
expiration, and timeouts in consideration.