import java.util.Arrays;

public class EcommerceSearch {

    // 1. Linear Search: Checks every element one by one
    public static Product linearSearch(Product[] products, int targetId) {
        for (Product p : products) {
            if (p.getProductId() == targetId) {
                return p;
            }
        }
        return null; // Product not found
    }

    // 2. Binary Search: Array MUST be sorted by ID for this to work
    public static Product binarySearch(Product[] products, int targetId) {
        int left = 0;
        int right = products.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (products[mid].getProductId() == targetId) {
                return products[mid];
            }
            if (products[mid].getProductId() < targetId) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return null; // Product not found
    }

    public static void main(String[] args) {
        // Setup: Array of products (Sorted by ID for Binary Search)
        Product[] inventory = {
                new Product(101, "Laptop", "Electronics"),
                new Product(105, "Headphones", "Accessories"),
                new Product(110, "Desk Chair", "Furniture"),
                new Product(125, "Coffee Maker", "Appliances"),
                new Product(150, "Smartphone", "Electronics")
        };

        int target = 110;

        System.out.println("--- Linear Search ---");
        Product resultLinear = linearSearch(inventory, target);
        System.out.println(resultLinear != null ? "Found: " + resultLinear : "Product not found.");

        System.out.println("\n--- Binary Search ---");
        Product resultBinary = binarySearch(inventory, target);
        System.out.println(resultBinary != null ? "Found: " + resultBinary : "Product not found.");
    }
}