import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MyServiceTest {

    // Exercise 1: Mocking and Stubbing
    @Test
    public void testExternalApi() {
        // 1. Create a mock object
        ExternalApi mockApi = mock(ExternalApi.class);

        // 2. Stub the method
        when(mockApi.getData()).thenReturn("Mock Data");

        // 3. Write a test case
        MyService service = new MyService(mockApi);
        String result = service.fetchData();

        assertEquals("Mock Data", result, "Result should match the stubbed data!");
        System.out.println("Exercise 1 Passed: Data mocked and stubbed successfully.");
    }

    // Exercise 2: Verifying Interactions
    @Test
    public void testVerifyInteraction() {
        // 1. Create a mock object
        ExternalApi mockApi = mock(ExternalApi.class);
        MyService service = new MyService(mockApi);

        // 2. Call the method
        service.fetchData();

        // 3. Verify the interaction (Check if getData() was called exactly once)
        verify(mockApi, times(1)).getData();
        System.out.println("Exercise 2 Passed: Interaction verified successfully.");
    }
}