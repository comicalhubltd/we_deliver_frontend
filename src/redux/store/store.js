import { configureStore} from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import driverSlice from '../reducer/driverSlice';
import deliveryRequestSlice from '../reducer/deliveryRequestSlice';
import loginSlice from '../reducer/loginSlice';
import customerSlice from '../reducer/customerSlice';
import sessionSlice from '../reducer/sessionSlice';
import passwordSlice from '../reducer/passwordSlice';
import paymentSlice from '../reducer/paymentSlice';
import vehicleSlice from '../reducer/vehicleSlice';

const store = configureStore({
    reducer: {
     customers: customerSlice,
     drivers: driverSlice,
     deliveryRequests: deliveryRequestSlice,


     login: loginSlice,

     sessions: sessionSlice,
     passwords: passwordSlice,
     vehicles: vehicleSlice,
     payments: paymentSlice
    },
  
    devTools: composeWithDevTools(),
   

});

export default store;