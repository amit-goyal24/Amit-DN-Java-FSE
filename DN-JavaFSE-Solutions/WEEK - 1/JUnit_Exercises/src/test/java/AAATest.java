import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AAATest {

    private String testData;

    // 1. Setup Method (Runs before every test)
    @BeforeEach
    public void setUp() {
        testData = "Cognizant Nurture";
        System.out.println("Setup: Test data initialized.");
    }

    // 2. Teardown Method (Runs after every test)
    @AfterEach
    public void tearDown() {
        testData = null;
        System.out.println("Teardown: Test data cleaned up.");
    }

    @Test
    public void testStringLengthUsingAAA() {
        // ARRANGE: Set up the specific conditions for this test
        int expectedLength = 17;

        // ACT: Execute the specific action you want to test
        int actualLength = testData.length();

        // ASSERT: Verify that the action produced the expected result
        assertEquals(expectedLength, actualLength, "Length of the string should be 17");
    }
}