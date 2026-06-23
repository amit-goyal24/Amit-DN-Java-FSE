import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AssertionsTest {

    @Test
    public void testAssertions() {
        // Assert equals (checks if two values are the same)
        assertEquals(5, 2 + 3, "2 + 3 should equal 5");

        // Assert true (checks if a condition is true)
        assertTrue(5 > 3, "5 is greater than 3");

        // Assert false (checks if a condition is false)
        assertFalse(5 < 3, "5 is not less than 3");

        // Assert null (checks if an object is null)
        assertNull(null, "Object should be null");

        // Assert not null (checks if an object exists)
        assertNotNull(new Object(), "Object should not be null");
    }
}