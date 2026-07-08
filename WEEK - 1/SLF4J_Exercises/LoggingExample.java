import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample {

    // Creating the logger object
    private static final Logger logger = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {
        System.out.println("Starting the application...");

        // Task: Logging error messages and warning levels
        logger.error("This is an error message. Something went wrong!");
        logger.warn("This is a warning message. Be careful!");

        System.out.println("Application finished execution.");
    }
}