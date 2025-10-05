import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';


const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/payment`;

export const savePayment = createAsyncThunk(
  'payment/savePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + '/add', paymentData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



export const getPaymentById = createAsyncThunk(
  'payment/getPaymentById',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get/${id}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify("Dowara " + response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getPaymentsPending = createAsyncThunk(
  'payment/getPaymentPending',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all-pending`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getPaymentsSuccess = createAsyncThunk(
  'payment/getPaymentSuccess',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all-success`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerPayment = createAsyncThunk(
  'payment/getCustomerPayment',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all-customer-payment`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log("Salamatu" + JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getExpiryDate = createAsyncThunk(
  'payment/getExpiryDate',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-expiry-date`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);




const paymentSlice = createSlice({
    name: 'Payment',
    initialState: {
        payments: [],
        schools: [],
        expiryDate: "",
        payment: null,
        schoolStatus: 'idle',
        savingStatus: 'idle',
        fetchingStatus: 'idle',
        deletingStatus: 'idle',
        existsStatus: 'idle',
        getStatus: 'idle',
        updateStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // SAVE SCHOOL
          .addCase(savePayment.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(savePayment.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
          })
          .addCase(savePayment.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })

                // GET AUTH SCHOOL
          .addCase(getPaymentById.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getPaymentById.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.payment = action.payload;
          })
          .addCase(getPaymentById.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



                    // GET PAYMENTS 
          .addCase(getPaymentsPending.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getPaymentsPending.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.payments = action.payload;
          })
          .addCase(getPaymentsPending.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



          .addCase(getPaymentsSuccess.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getPaymentsSuccess.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.payments = action.payload;
          })
          .addCase(getPaymentsSuccess.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(getCustomerPayment.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerPayment.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.payments = action.payload;
          })
          .addCase(getCustomerPayment.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


          
                    // GET expiry Date
          .addCase(getExpiryDate.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getExpiryDate.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.expiryDate = action.payload;
          })
          .addCase(getExpiryDate.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })
      },
});


export default paymentSlice.reducer;