import java.util.Random;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;

public class MainTest {
    public static void main(String args[]){
        IntStream intStream = IntStream.range(1, 5);

        Random random = new Random();
        DoubleStream doubleStream = random.doubles(3);

        doubleStream.forEach(System.out::println);
    }
}
