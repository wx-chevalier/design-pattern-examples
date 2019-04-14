import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.LongAdder;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/** 线程安全的 +1 操作实现种类 */
public class MultiplePlusOneTest extends Thread {

    // 整体表现最好,短时间的低并发下比AtomicInteger性能差一点，高并发下性能最高；
    private static LongAdder longAdder = new LongAdder();

    // 短时间低并发下，效率比synchronized高，甚至比LongAdder还高出一点，但是高并发下，性能还不如synchronized；不同情况下性能表现很不稳定；可见atomic只适合锁争用不激烈的场景
    private static Lock lock = new ReentrantLock();
    private static AtomicInteger atomInteger = new AtomicInteger(0);

    // 单线程情况性能最好，随着线程数增加，性能越来越差，但是比cas高
    private static int $synchronized = 0;

    // 对a执行+1操作，执行10000次
    @Override
    public void run() {
        int i = 1;
        while (i <= 10000000) {
            // 测试 AtomicInteger，16395
            // atomInteger.incrementAndGet();

            // 测试 LongAdder
            // longAdder.increment();

            // 测试 volatile 和 cas 乐观锁
            // cas();

            // 测试锁
            synchronized (lock) {
                ++$synchronized;
            }

            i++;
        }
    }

    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        // 100个线程
        for (int i = 1; i <= 60; i++) {
            new MultiplePlusOneTest().start();
        }

        while (Thread.activeCount() > 1) {
            Thread.yield();
        }

        System.out.println(System.currentTimeMillis() - start);
        System.out.println($synchronized);
        System.out.println(atomInteger);
        System.out.println(longAdder);
    }
}
