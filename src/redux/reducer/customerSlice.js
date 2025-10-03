import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/customer`;


export const saveCustomer = createAsyncThunk(
  'customer/save',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post(BASE_URL + '/add', requestData);
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);




export const updateCustomer = createAsyncThunk(
  'driver/updateCustomer',
  async ({id, customerData},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(BASE_URL + `/update/${id}`, customerData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);





export const getCustomerById = createAsyncThunk(
  'customer/getCustomerById',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-customer-by-id/${id}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);





export const updateSchool = createAsyncThunk(
  'school/updateSchool',
  async ({id, schoolData},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log("From Inside Slice" + id);
      console.log("From Inside Slice" + schoolData);
      const response = await api.put(BASE_URL + `/update-school/${id}`, schoolData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);







export const getallCustomerCount = createAsyncThunk(
  'customer/getallCustomerCount',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/count-customers`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getAuthCustomer = createAsyncThunk(
  'customer/getAuthCustomer',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-auth-customer`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);







export const getAllCustomers = createAsyncThunk(
  'customers/getAllCustomers',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      console.log(JSON.stringify(response.data))
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);





export const deleteCustomer = createAsyncThunk(
  'delivery/deleteCustomer',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(BASE_URL + `/delete/${id}`, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const deleteSchool = createAsyncThunk(
  'Student/deleteStudent',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(BASE_URL + `/delete/${id}`, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);






const customerSlice = createSlice({
    name: 'Customer',
    initialState: {
        customers: [],
        allCustomerCount: 0,
        customer: null,
        authCustomer: null,
  

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
          .addCase(saveCustomer.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(saveCustomer.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            
          })
          .addCase(saveCustomer.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


          .addCase(getallCustomerCount.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getallCustomerCount.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.allCustomerCount = action.payload;
          })
          .addCase(getallCustomerCount.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



          .addCase(getAuthCustomer.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getAuthCustomer.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.authCustomer = action.payload;
          })
          .addCase(getAuthCustomer.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



          
          .addCase(getCustomerById.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerById.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customer = action.payload;
          })
          .addCase(getCustomerById.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


           .addCase(updateCustomer.pending, (state) => {
                                          state.updateStatus = 'loading';
                                        })
                                        .addCase(updateCustomer.fulfilled, (state, action) => {
                                          const index = state.customers.findIndex(customer => customer.id === action.payload.customerDto.id);
                                          if (index !== -1) {
                                            // Replace the old user object with the updated one
                                            state.customers[index] = action.payload.customerDto;
                                          }
                                          state.updateStatus = 'succeeded';
                                        })
                                        .addCase(updateCustomer.rejected, (state) => {
                                          state.updateStatus = 'failed';
                                        })



                    .addCase(deleteCustomer.pending, (state) => {
                      state.deletingStatus = 'loading';
                    })
                    .addCase(deleteCustomer.fulfilled, (state, action) => {
                      state.deletingStatus = 'succeeded';
                      state.customers = state.customers.filter(customer => customer.id !== action.payload.id);
                    })
                    .addCase(deleteCustomer.rejected, (state) => {
                      state.deletingStatus = 'failed';
            })



        
          .addCase(getAllCustomers.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getAllCustomers.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customers = action.payload;
          })
          .addCase(getAllCustomers.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



    
                    .addCase(deleteSchool.pending, (state) => {
                      state.deletingStatus = 'loading';
                    })
                    .addCase(deleteSchool.fulfilled, (state, action) => {
                      state.deletingStatus = 'succeeded';
                      state.schools = state.schools.filter(school => school.id !== action.payload.id);
                    })
                    .addCase(deleteSchool.rejected, (state) => {
                      state.deletingStatus = 'failed';
                    })



      },
});


export default customerSlice.reducer;