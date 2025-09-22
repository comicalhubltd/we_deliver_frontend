import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRegistration from './component/customer/CustomerRegistration';
import CustomerDashboard from './component/dashboards/CustomerDashboard';
import AddStudent from './component/driver/AddStudent';
import PrivateRoute from './component/routing/PrivateRoute';
import AddDeliveryRequest from './component/DeliveryRequest/AddDeliveryRequest';
import OnTransit from './component/DeliveryRequest/OnTransit';
import YetToDelivered from './component/DeliveryRequest/YetToDelivered';
import Delivered from './component/DeliveryRequest/Delivered';
import AcceptRequest from './component/newRequest/AcceptRequest';
import AdminDashboard from './component/dashboards/AdminDashboard';
import DriverDashboard from './component/dashboards/DriverDashboard';
import PasswordRequest from './component/auth/PasswordRequest';
import ResetPassword from './component/auth/ResetPassword';
import VerifierPage from './component/customer/VerifierPage';
import NavBar from './component/Chunks/NavBar';
import PayUS from './component/subscription/PayUs';
import Payments from './component/subscription/Payments';
import StudentProfile from './component/driver/StudentProfile';
import SchoolProfile from './component/customer/SchoolProfile';
import SchoolsAdmin from './component/admin/SchoolsAdmin';
import AdminSchoolsDetails from './component/admin/AdminSchoolsDetails';
import UpdateSchool from './component/admin/UpdateSchool';
import SchoolActivator from './component/admin/SchoolActivator';
import Services from './component/home/Services';
import ContactUs from './component/home/ContactUs';
import AboutUs from './component/home/AboutUs';
import StudentResetPassword from './component/driver/StudentResetPassword';
import AdminProfile from './component/admin/AdminProfile';
import Loading from './component/Chunks/loading';
import DriverRegistration from './component/driver/DriverRegistration';
import LoginAdmin from './component/auth/LoginAdmin';
import LoginCustomer from './component/auth/LoginCustomer';
import LoginDriver from './component/auth/LoginDriver';
import Pending from './component/DeliveryRequest/Pending';
import ViewAllRequest from './component/DeliveryRequest/ViewAllRequest';
import CustomerOnTransit from './component/DeliveryRequest/CustomerOnTransit';
import CustomerPending from './component/DeliveryRequest/CustomerPending';
import CustomerViewAllRequest from './component/DeliveryRequest/CustomerViewAllRequest';
import CustomerYetToDelivered from './component/DeliveryRequest/CustomerYetToDelivered';
import CustomerDelivered from './component/DeliveryRequest/CustomerDelivered';
import RequestConfirmation from './component/newRequest/RequestConfirmation';
import Home from './component/home/Home';
import ViewAllCustomers from './component/customer/ViewAllCustomers';
import ViewAllDrivers from './component/driver/ViewAllDrivers';

function App() {

  
  
  return (
    <Router>
    <Routes>
     
        
           {/*Delivery Request Releted*/}
         <Route exact path='/delivery/view-all-delivery'  element={ <ViewAllRequest/> }/>
         <Route exact path='/delivery/pending'  element={ <Pending/> }/>
         <Route exact path='/delivery/on-transit'  element={ <OnTransit/> }/>
         <Route exact path='/delivery/delivered'  element={ <Delivered/> }/>
         <Route exact path='/delivery/yet-to-delivered'  element={ <YetToDelivered/> }/>

         <Route exact path='/delivery/customer-view-all-delivery'  element={ <CustomerViewAllRequest/> }/>
         <Route exact path='/delivery/customer-pending'  element={ <CustomerPending/> }/>
         <Route exact path='/delivery/customer-on-transit'  element={ <CustomerOnTransit/> }/>
         <Route exact path='/delivery/customer-delivered'  element={ <CustomerDelivered/> }/>
         <Route exact path='/delivery/customer-yet-to-delivered'  element={ <CustomerYetToDelivered/> }/>

        <Route exact path='/delivery/add-delivery'  element={ <AddDeliveryRequest/> }/>
  
         {/*new request releted Releted*/}
   
         <Route exact path='/delivery/new-requests'  element={ <AcceptRequest/> }/>
          <Route exact path='/delivery/view-request-details/:id'  element={ <RequestConfirmation/> }/> 
          
              {/*Payment Releted*/}
        <Route exact path='/payment/pay-subscription'  element={ <PayUS/> }/>
        <Route exact path='/payment/all-payments'  element={ <Payments/> }/>

          {/*Password Releted*/}
        <Route exact path='/password/password-request'  element={<PasswordRequest/>}/>
         <Route exact path='/password/password-reset'  element={<ResetPassword/>}/>
         <Route exact path='/password/password-reset-student'  element={<StudentResetPassword/>}/>
        {/*school Releted*/}
            <Route exact path='/admin/school-activator/:id' element={ <SchoolActivator/> }/>
            <Route exact path='/admin/update-school/:id' element={ <UpdateSchool/> }/>
             <Route exact path='/admin/school-profile/:id' element={ <AdminSchoolsDetails/> }/>
            <Route exact path='/school/school-profile' element={ <SchoolProfile/> }/>

          {/*Admin Releted*/}
          <Route exact path='/admin/schools' element={ <SchoolsAdmin/> }/>
            <Route exact path='/admin/profile' element={ <AdminProfile/> }/>


                {/*customer reletated Releted*/}
          <Route exact path='/customer/view-customers' element={ <ViewAllCustomers/> }/>
              {/*driver reletated Releted*/}
          <Route exact path='/driver/view-drivers' element={ <ViewAllDrivers/> }/>
     

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
        <Route exact path='/school/verify-account'  element={ <VerifierPage/> }/>
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
