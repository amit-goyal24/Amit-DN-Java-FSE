public class SingletonTest {
    public static void main(String[] args) {
        // Fetching instances of Logger
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        // Testing the instances
        logger1.log("This is the first log message.");
        logger2.log("This is the second log message.");

        // Verifying if both instances are the exact same object in memory
        if (logger1 == logger2) {
            System.out.println("Result: Singleton pattern implemented successfully! Both instances are the same.");
        } else {
            System.out.println("Result: Singleton pattern failed. Instances are different.");
        }
    }
}