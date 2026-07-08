public class FinancialForecasting {

    // Recursive method to calculate future value
    // Formula conceptually: FV = PV * (1 + growthRate)^years
    public static double calculateFutureValue(double presentValue, double growthRate, int years) {
        // Base Case: If years are 0, the value remains the present value
        if (years == 0) {
            return presentValue;
        }

        // Recursive Call: Calculate for (years - 1) and add the growth for the current year
        return calculateFutureValue(presentValue, growthRate, years - 1) * (1 + growthRate);
    }

    public static void main(String[] args) {
        // Setup values
        double initialAmount = 1000.0; // Starting with 1000 rupees/dollars
        double annualGrowthRate = 0.05; // 5% growth rate
        int forecastYears = 5; // Predict for next 5 years

        // Call the recursive function
        double futureValue = calculateFutureValue(initialAmount, annualGrowthRate, forecastYears);

        System.out.println("--- Financial Forecast ---");
        System.out.println("Present Value: " + initialAmount);
        System.out.println("Growth Rate: " + (annualGrowthRate * 100) + "%");
        System.out.println("Forecast Period: " + forecastYears + " years");
        System.out.printf("Predicted Future Value: %.2f\n", futureValue);
    }
}