import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRegistration from './component/customer/CustomerRegistration';
import CustomerDashboard from './component/dashboards/CustomerDashboard';
import AddDeliveryRequest from './component/DeliveryRequest/AddDeliveryRequest';
import OnTransit from './component/DeliveryRequest/OnTransit';
import DriverProfile from './component/driver/DriverProfile';
import AddRequestToTransit from './component/admin/AddRequestToTransit';
import Delivered from './component/DeliveryRequest/Delivered';
import AcceptRequest from './component/newRequest/AcceptRequest';
import AdminDashboard from './component/dashboards/AdminDashboard';
import DriverDashboard from './component/dashboards/DriverDashboard';
import PasswordRequest from './component/auth/PasswordRequest';
import ResetPassword from './component/auth/ResetPassword';
import NavBar from './component/Chunks/NavBar';
import PayUS from './component/subscription/PayUs';
import Payments from './component/subscription/Payments';
import CustomerProfile from './component/customer/CustomerProfile';
import Services from './component/home/Services';
import ContactUs from './component/home/ContactUs';
import AboutUs from './component/home/AboutUs';
import StudentResetPassword from './component/driver/StudentResetPassword';
import DriverRegistration from './component/driver/DriverRegistration';
import LoginAdmin from './component/auth/LoginAdmin';
import LoginCustomer from './component/auth/LoginCustomer';
import LoginDriver from './component/auth/LoginDriver';
import Pending from './component/DeliveryRequest/Pending';
import ViewAllRequest from './component/DeliveryRequest/ViewAllRequest';
import CustomerOnTransit from './component/DeliveryRequest/CustomerOnTransit';
import CustomerPending from './component/DeliveryRequest/CustomerPending';
import CustomerViewAllRequest from './component/DeliveryRequest/CustomerViewAllRequest';
import CustomerAwatingTransit from './component/DeliveryRequest/CustomerAwaitingTransit';
import AwaitingTransit from './component/DeliveryRequest/AwaitingTransit';
import CustomerDelivered from './component/DeliveryRequest/CustomerDelivered';
import RequestConfirmation from './component/newRequest/RequestConfirmation';
import Home from './component/home/Home';
import ViewAllCustomers from './component/customer/ViewAllCustomers';
import ViewAllDrivers from './component/driver/ViewAllDrivers';
import AssignVehicle from './component/driver/AssignVehicle';
import AddVehicle from './component/vehicle/AddVehicle';
import Arrived from './component/DeliveryRequest/Arrived';
import Rejected from './component/DeliveryRequest/Rejected';
import CustomerArrived from './component/DeliveryRequest/CustomerArrived';
import CustomerRejected from './component/DeliveryRequest/CustomerRejected';
import DeliveryDetails from './component/DeliveryRequest/DeliveryDetails';
import UpdateDelivery from './component/DeliveryRequest/UpdateDelivery';
import ViewVehicles from './component/admin/ViewVehicles';
import CustomerViewFeedback from './component/DeliveryRequest/CustomerViewFeedback';
import FeedbackDescription from './component/DeliveryRequest/FeedbackDescription';
import DriverDetails from './component/driver/DriverDetails';
import CustomerDetails from './component/customer/CustomerDetails';
import UpdateCustomer from './component/customer/UpdateCustomer';
import UpdateDriver from './component/driver/UpdateDriver';
import DriverLocationIdentifier from './component/location/DriverLocationFinder';
import DriverMovements from './component/driver/DriverMovements';
import ViewDriverVehicle from './component/driver/ViewDriverVehicle';
import AdminLocationIdentifier from './component/location/AdminLocationView';


function App() {

  
  
  return (
    <Router>
    <Routes>
     

     {/*Location Releted*/}
        <Route exact path='/location' element={<AdminLocationIdentifier/>}/>
           {/*Delivery Request Releted*/}
        
         <Route exact path='/delivery/customer-view-all-delivery'  element={ <CustomerViewAllRequest/> }/>
         <Route exact path='/delivery/customer-pending'  element={ <CustomerPending/> }/>
         <Route exact path='/delivery/customer-rejected'  element={ <CustomerRejected/> }/>
         <Route exact path='/delivery/customer-on-transit'  element={ <CustomerOnTransit/> }/>
         <Route exact path='/delivery/customer-delivered'  element={ <CustomerDelivered/> }/>
         <Route exact path='/delivery/customer-awaiting-transit'  element={ <CustomerAwatingTransit/> }/>
         <Route exact path='/delivery/customer-view-feedback'  element={ <CustomerViewFeedback/>}/>
        <Route exact path='/delivery/feedback-description/:id'  element={ <FeedbackDescription/>}/>
        <Route exact path='/delivery/delivery-details/:id'  element={ <DeliveryDetails/> }/>
        <Route exact path='/delivery/add-delivery'  element={ <AddDeliveryRequest/> }/>
         <Route exact path='/delivery/update-delivery/:id'  element={ <UpdateDelivery/> }/>
         {/*new request releted Releted*/}
   
         <Route exact path='/delivery/new-requests'  element={ <AcceptRequest/> }/>
         <Route exact path='/delivery/view-request-details/:id'  element={ <RequestConfirmation/> }/> 
         <Route exact path='/delivery/add-request-to-transit/:driverId'  element={ <AddRequestToTransit/> }/> 
          
              {/*Payment Releted*/}
        <Route exact path='/payment/pay-subscription'  element={ <PayUS/> }/>
        <Route exact path='/payment/all-payments'  element={ <Payments/> }/>

          {/*Password Releted*/}
        <Route exact path='/password/password-request'  element={<PasswordRequest/>}/>
         <Route exact path='/password/password-reset'  element={<ResetPassword/>}/>
         <Route exact path='/password/password-reset-student'  element={<StudentResetPassword/>}/>
        {/*school Releted*/}
           
            <Route exact path='/customer/customer-profile' element={ <CustomerProfile/> }/>

               {/*Admin Releted*/}
              <Route exact path='/delivery/view-all-delivery'  element={ <ViewAllRequest/> }/>
              <Route exact path='/delivery/pending'  element={ <Pending/> }/>
              <Route exact path='/delivery/on-transit'  element={ <OnTransit/> }/>
              <Route exact path='/delivery/delivered'  element={ <Delivered/> }/>
              <Route exact path='/delivery/awaiting-transit'  element={ <AwaitingTransit/> }/>
              <Route exact path='/delivery/arrived'  element={ <Arrived/> }/>
              <Route exact path='/delivery/rejected'  element={ <Rejected/> }/>

               {/*vehicle Releted*/}
               
              <Route exact path='/vehicle/view-driver-vehicle'  element={ <ViewDriverVehicle/> }/>
               <Route exact path='/vehicle/view-vehicles'  element={ <ViewVehicles/> }/>

                {/*customer reletated Releted*/}
          <Route exact path='/customer/view-customers' element={ <ViewAllCustomers/> }/>
           <Route exact path='/customer/customer-details/:id'  element={ <CustomerDetails/> }/>
           <Route exact path='/customer/customer-update/:id'  element={ <UpdateCustomer/> }/>
              {/*driver reletated Releted*/}
          <Route exact path='/driver/view-drivers' element={ <ViewAllDrivers/> }/>
          <Route exact path='/driver/assign-vehicle' element={ <AssignVehicle/> }/>
           <Route exact path='/driver/driver-profile' element={ <DriverProfile/> }/>
         <Route exact path='/driver/driver-details/:id' element={ <DriverDetails/> }/>
           <Route exact path='/driver/driver-update/:id'  element={ <UpdateDriver/> }/>
           <Route exact path='/driver/driver-movements'  element={ <DriverMovements/> }/>
        
         {/*vehicle Releted*/}
       <Route exact path='/driver/add-vehicle/:id' element={ <AddVehicle/> }/>
           {/*Dashboard Releted*/}
        <Route exact path='/customer/home' element={ <CustomerDashboard/> }/>
        <Route exact path='/admin/home' element={ <AdminDashboard/> }/>
        <Route exact path='/driver/home' element={ <DriverDashboard/> }/>
            {/*Registration and Login*/}
        <Route exact path='/customer/register'  element={<CustomerRegistration/>}/>
         <Route exact path='/driver/register'  element={<DriverRegistration/>}/>
        <Route exact path='/driver/login'  element={<LoginDriver/>}/>
        <Route exact path='/customer/login'  element={<LoginCustomer/>}/>
        <Route exact path='/admin/login'  element={<LoginAdmin/>}/>
           {/*Website*/}
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/services' element={<Services/>}/>
        <Route exact path='/contact-us' element={<ContactUs/>}/>
        <Route exact path='/about-us' element={<AboutUs/>}/>



              {/* Student Releted
        <Route exact path='/student/add-student'  element={ <AddStudent/> }/>
        <Route exact path='/student/view-students'  element={ <ViewStudents/> }/>
        <Route exact path='/student/students/:className'  element={ <Students/> }/>
        <Route exact path='/student/update-student/:id/:className'  element={ <UpdateStudent/> }/>
        <Route exact path='/student/student-details/:id'  element={ <StudentDetails/> }/>
         <Route exact path='/student/student-profile'  element={ <StudentProfile/> }/> */}
    </Routes>
</Router>
  );
}

export default App;
