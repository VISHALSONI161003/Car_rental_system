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
    public void rentCar(Car car, Customer customer, int rentalDays){
        if(car.getIsAvailable()){
            car.rent();
        }
    }
}

public class main {
    
    
}
