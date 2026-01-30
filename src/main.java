import java.util.*;
import java.util.ArrayList;
import java.util.List;
class Car{
    private String Id;
    private String Brand;
    private String Model;
    private double BASE_PRICE_PER_DAY;
    private boolean isAvailable; 
    //constructor
    public Car(String Id, String Brand, String Model, double BASE_PRICE_PER_DAY) {
        this.Id = Id;
        this.Brand = Brand;
        this.Model = Model;
        this.BASE_PRICE_PER_DAY = BASE_PRICE_PER_DAY;
        this.isAvailable = true;
    }
    // getters and setters
    public String getId(){
        return Id;
    }
    public String getBrand(){
        return Brand;
    }
    public String getModel(){
        return Model;
    }
    public boolean getIsAvailable(){
        return isAvailable;
    }
    public void rent(){
        isAvailable = false;
    }
    public void returnCar(){
        isAvailable = true;
    }
    public double calculateRentalCost(int rentaldays){
        return BASE_PRICE_PER_DAY * rentaldays;
    }
        

}
// customer class
class Customer{
    private String customerId;
    private String Name;
    private String ContactInfo;
    //constructor
    public Customer(String customerId, String Name, String ContactInfo){
        this.customerId = customerId;
        this.Name = Name;
        this.ContactInfo = ContactInfo;
    }
    //getters
    public String getCustomerId(){
        return customerId;
    }
    public String getName(){
        return Name;
    }
    public String getContactInfo(){
        return ContactInfo;
    }
    
}
// rental class
class Rental{
    private Car rentedCar;
    private Customer renting_customer;
    private int rentalDays;
    //constructor
    public Rental(Car rentedCar, Customer rentingCustomer, int rentalDays){
        this.rentedCar = rentedCar;
        this.renting_customer = rentingCustomer;
        this.rentalDays = rentalDays;
    }
    //getters
    public Car getRentedCar(){
        return rentedCar;
    }
    public Customer getRentingCustomer(){
        return renting_customer;
    }
    public int getRentalDays(){
        return rentalDays;
    }
}
class CarRentalSystem{
    private List<Car> cars;
    private List<Customer> customers;
    private List<Rental> rentals; 
    //constructor
    public CarRentalSystem(){
        cars = new ArrayList<>();
        customers = new ArrayList<>();
        rentals = new ArrayList<>();
    }
    public void addCar(Car car){
        cars.add(car);
    }
    public void addCustomer(Customer customer){
        customers.add(customer);
    } 
    // rent car method
    public void rentCar(Car car, Customer customer, int rentalDays){
        if(car.getIsAvailable()){
            car.rent();
            rentals.add(new Rental(car, customer, rentalDays));
        }
        else{
            System.out.println("Car is not available for rent.");
        }

    }
    // return car method
    public void returnCar(Car car){
        Rental rentalToRemove = null;
        for(Rental rental : rentals){
            if(rental.getRentedCar()==car){
                rentalToRemove = rental;
                break;
            }
        }
        if(rentalToRemove != null){
            rentals.remove(rentalToRemove);
            System.out.println("Car returned successfully.");
            car.returnCar();
        }
        else{
            System.out.println("car was not rented from this system.");
        }
    }
    // formatting rental receipt
    public void menu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("===== Car Rental System =====");
            System.out.println("1. Rent a Car");
            System.out.println("2. Return a Car");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            if (choice == 1) {
                System.out.println("\n== Rent a Car ==\n");
                System.out.print("Enter your name: ");
                String customerName = scanner.nextLine();

                System.out.println("\nAvailable Cars:");
                for (Car car : cars) {
                    if (car.getIsAvailable()) {
                        System.out.println(car.getId() + " - " + car.getBrand() + " " + car.getModel());
                    }
                }

                System.out.print("\nEnter the car ID you want to rent: ");
                String carId = scanner.nextLine();

                System.out.print("Enter the number of days for rental: ");
                int rentalDays = scanner.nextInt();
                scanner.nextLine(); // Consume newline

                Customer newCustomer = new Customer("CUS" + (customers.size() + 1), customerName, "Phone");
                addCustomer(newCustomer);

                Car selectedCar = null;
                for (Car car : cars) {
                    if (car.getId().equals(carId) && car.getIsAvailable()) {
                        selectedCar = car;
                        break;
                    }
                }

                if (selectedCar != null) {
                    double totalPrice = selectedCar.calculateRentalCost(rentalDays);
                    System.out.println("\n== Rental Information ==\n");
                    System.out.println("Customer ID: " + newCustomer.getCustomerId());
                    System.out.println("Customer Name: " + newCustomer.getName());
                    System.out.println("Car: " + selectedCar.getBrand() + " " + selectedCar.getModel());
                    System.out.println("Rental Days: " + rentalDays);
                    System.out.printf("Total Price: $%.2f%n", totalPrice);

                    System.out.print("\nConfirm rental (Y/N): ");
                    String confirm = scanner.nextLine();

                    if (confirm.equalsIgnoreCase("Y")) {
                        rentCar(selectedCar, newCustomer, rentalDays);
                        System.out.println("\nCar rented successfully.");
                    } else {
                        System.out.println("\nRental canceled.");
                    }
                } else {
                    System.out.println("\nInvalid car selection or car not available for rent.");
                }
            } else if (choice == 2) {
                System.out.println("\n== Return a Car ==\n");
                System.out.print("Enter the car ID you want to return: ");
                String carId = scanner.nextLine();

                Car carToReturn = null;
                for (Car car : cars) {
                    if (car.getId().equals(carId) && !car.getIsAvailable()) {
                        carToReturn = car;
                        break;
                    }
                }

                if (carToReturn != null) {
                    Customer customer = null;
                    for (Rental rental : rentals) {
                        if (rental.getRentedCar() == carToReturn) {
                            customer = rental.getRentingCustomer();
                            break;
                        }
                    }

                    if (customer != null) {
                        returnCar(carToReturn);
                        System.out.println("Car returned successfully by " + customer.getName());
                    } else {
                        System.out.println("Car was not rented or rental information is missing.");
                    }
                } else {
                    System.out.println("Invalid car ID or car is not rented.");
                }
            } else if (choice == 3) {
                break;
            } else {
                System.out.println("Invalid choice. Please enter a valid option.");
            }
        }

        System.out.println("\nThank you for using the Car Rental System!");
    }
}


public class main {
    public static void main(String[] args) {
        CarRentalSystem system = new CarRentalSystem();
        
        // Add sample cars
        system.addCar(new Car("C001", "Toyota", "Camry", 50.0));
        system.addCar(new Car("C002", "Honda", "Civic", 45.0));
        system.addCar(new Car("C003", "Ford", "Mustang", 80.0));
        system.addCar(new Car("C004", "Chevrolet", "Malibu", 55.0));
        system.addCar(new Car("C005", "Nissan", "Altima", 48.0));
        system.addCar(new Car("C006", "BMW", "3 Series", 100.0));
        system.addCar(new Car("C007", "Audi", "A4", 110.0));
        
        
        // Start the menu
        system.menu();
    }
}
