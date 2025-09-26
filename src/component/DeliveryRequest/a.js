// @Service
// @Transactional
// public class EntityDeletionService {

//     @Autowired
//     private DeliveryRequestRepository deliveryRequestRepository;
    
//     @Autowired
//     private CustomerRepository customerRepository;
    
//     @Autowired
//     private DriverRepository driverRepository;
    
//     @Autowired
//     private VehicleRepository vehicleRepository;
    
//     @Autowired
//     private MovementRepository movementRepository;
    
//     @Autowired
//     private PaymentRepository paymentRepository;
    
//     @Autowired
//     private UserRepository userRepository;

    // /**
    //  * Safely delete a DeliveryRequest and its related entities
    //  * Order of deletion is important due to foreign key constraints
    //  */
    // public boolean deleteDeliveryRequest(Long deliveryRequestId) {
    //     try {
    //         Optional<DeliveryRequest> deliveryRequestOpt = deliveryRequestRepository.findById(deliveryRequestId);
            
    //         if (deliveryRequestOpt.isEmpty()) {
    //             throw new EntityNotFoundException("DeliveryRequest with id " + deliveryRequestId + " not found");
    //         }
            
    //         DeliveryRequest deliveryRequest = deliveryRequestOpt.get();
            
    //         // 1. Delete Payment if exists (OneToOne with DeliveryRequest)
    //         if (deliveryRequest.getPayment() != null) {
    //             paymentRepository.delete(deliveryRequest.getPayment());
    //         }
            
    //         // 2. Delete Movement and its locations (OneToOne with DeliveryRequest)
    //         if (deliveryRequest.getMovement() != null) {
    //             // Locations will be deleted by CASCADE
    //             movementRepository.delete(deliveryRequest.getMovement());
    //         }
            
    //         // 3. Delete Item and its Size (OneToOne with DeliveryRequest)
    //         if (deliveryRequest.getItem() != null) {
    //             // Size will be deleted by CASCADE due to orphanRemoval = true
    //             // No need to explicitly delete Size
    //         }
            
    //         // 4. Finally delete the DeliveryRequest
    //         // Item will be deleted by CASCADE
    //         // Address entities (from/to) will not be deleted as they might be referenced elsewhere
    //         deliveryRequestRepository.delete(deliveryRequest);
            
    //         return true;
            
    //     } catch (Exception e) {
    //         throw new RuntimeException("Failed to delete DeliveryRequest: " + e.getMessage(), e);
    //     }
    // }

//     /**
//      * Safely delete a Customer and all related delivery requests
//      * WARNING: This will delete ALL delivery requests for this customer
//      */
//     public boolean deleteCustomer(Long customerId) {
//         try {
//             Optional<Customer> customerOpt = customerRepository.findById(customerId);
            
//             if (customerOpt.isEmpty()) {
//                 throw new EntityNotFoundException("Customer with id " + customerId + " not found");
//             }
            
//             Customer customer = customerOpt.get();
            
//             // 1. Delete all delivery requests for this customer
//             List<DeliveryRequest> deliveryRequests = customer.getDeliveryRequests();
//             for (DeliveryRequest deliveryRequest : new ArrayList<>(deliveryRequests)) {
//                 deleteDeliveryRequest(deliveryRequest.getId());
//             }
            
//             // 2. Delete associated User if exists
//             if (customer.getUser() != null) {
//                 userRepository.delete(customer.getUser());
//             }
            
//             // 3. Delete the Customer
//             // Profile will not be deleted as it might be referenced elsewhere
//             customerRepository.delete(customer);
            
//             return true;
            
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to delete Customer: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Safely delete a Driver and handle related entities
//      * This will also delete all movements and vehicles associated with the driver
//      */
//     public boolean deleteDriver(Long driverId) {
//         try {
//             Optional<Driver> driverOpt = driverRepository.findById(driverId);
            
//             if (driverOpt.isEmpty()) {
//                 throw new EntityNotFoundException("Driver with id " + driverId + " not found");
//             }
            
//             Driver driver = driverOpt.get();
            
//             // 1. Handle movements - need to be careful as they're linked to delivery requests
//             List<Movement> movements = driver.getMovements();
//             for (Movement movement : new ArrayList<>(movements)) {
//                 // Set driver to null in movement instead of deleting movement
//                 // because movement is linked to DeliveryRequest
//                 movement.setDriver(null);
//                 movementRepository.save(movement);
//             }
            
//             // 2. Delete associated vehicles
//             List<Vehicle> vehicles = driver.getVehicles();
//             for (Vehicle vehicle : new ArrayList<>(vehicles)) {
//                 vehicleRepository.delete(vehicle);
//             }
            
//             // 3. Delete associated User if exists
//             if (driver.getUser() != null) {
//                 userRepository.delete(driver.getUser());
//             }
            
//             // 4. Delete the Driver
//             // Profile will not be deleted as it might be referenced elsewhere
//             driverRepository.delete(driver);
            
//             return true;
            
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to delete Driver: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Safely delete a Vehicle
//      * This is straightforward as Vehicle is on the many side of ManyToOne relationship
//      */
//     public boolean deleteVehicle(Long vehicleId) {
//         try {
//             Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);
            
//             if (vehicleOpt.isEmpty()) {
//                 throw new EntityNotFoundException("Vehicle with id " + vehicleId + " not found");
//             }
            
//             Vehicle vehicle = vehicleOpt.get();
            
//             // Check if vehicle is currently in use (optional business logic)
//             if (vehicle.isAvailable()) {
//                 // You might want to add additional checks here
//                 // For example, check if there are active movements using this vehicle
//             }
            
//             vehicleRepository.delete(vehicle);
//             return true;
            
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to delete Vehicle: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Safely delete a Movement
//      * Be careful as this might affect DeliveryRequest tracking
//      */
//     public boolean deleteMovement(Long movementId) {
//         try {
//             Optional<Movement> movementOpt = movementRepository.findById(movementId);
            
//             if (movementOpt.isEmpty()) {
//                 throw new EntityNotFoundException("Movement with id " + movementId + " not found");
//             }
            
//             Movement movement = movementOpt.get();
            
//             // Check if movement is linked to a delivery request
//             if (movement.getDeliveryRequest() != null) {
//                 // You might want to update the delivery request status
//                 DeliveryRequest deliveryRequest = movement.getDeliveryRequest();
//                 deliveryRequest.setStatus("MOVEMENT_CANCELLED"); // or appropriate status
//                 deliveryRequestRepository.save(deliveryRequest);
//             }
            
//             // Delete movement - locations will be deleted by CASCADE
//             movementRepository.delete(movement);
//             return true;
            
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to delete Movement: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Safe batch deletion with validation
//      */
//     public boolean deleteMultipleDeliveryRequests(List<Long> deliveryRequestIds) {
//         try {
//             for (Long id : deliveryRequestIds) {
//                 deleteDeliveryRequest(id);
//             }
//             return true;
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to delete multiple DeliveryRequests: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Utility method to check if an entity can be safely deleted
//      */
//     public boolean canDeleteCustomer(Long customerId) {
//         Optional<Customer> customerOpt = customerRepository.findById(customerId);
//         if (customerOpt.isEmpty()) {
//             return false;
//         }
        
//         Customer customer = customerOpt.get();
//         // Add business logic here - for example:
//         // - Check if customer has pending delivery requests
//         // - Check if customer has unpaid invoices
//         // - etc.
        
//         long pendingDeliveries = customer.getDeliveryRequests().stream()
//             .filter(dr -> "PENDING".equals(dr.getStatus()) || "IN_PROGRESS".equals(dr.getStatus()))
//             .count();
            
//         return pendingDeliveries == 0;
//     }

//     public boolean canDeleteDriver(Long driverId) {
//         Optional<Driver> driverOpt = driverRepository.findById(driverId);
//         if (driverOpt.isEmpty()) {
//             return false;
//         }
        
//         Driver driver = driverOpt.get();
//         // Check if driver has active movements
//         long activeMovements = driver.getMovements().stream()
//             .filter(m -> m.getDeliveryRequest() != null && 
//                         ("PENDING".equals(m.getDeliveryRequest().getStatus()) || 
//                          "IN_PROGRESS".equals(m.getDeliveryRequest().getStatus())))
//             .count();
            
//         return activeMovements == 0;
//     }
// }