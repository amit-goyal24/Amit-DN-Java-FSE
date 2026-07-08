public class Logger {
    // Private static instance of the class
    private static Logger instance;

    // Private constructor so that it cannot be instantiated from outside
    private Logger() {
        // Initialization code (if any)
    }

    // Public static method to get the single instance of the class
    public static Logger getInstance() {
        if (instance == null) {
            // Synchronized block to ensure thread safety
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }

    // A simple method to demonstrate logging
    public void log(String message) {
        System.out.println("[LOG]: " + message);
    }
}