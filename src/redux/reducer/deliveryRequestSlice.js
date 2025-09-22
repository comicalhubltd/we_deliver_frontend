import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/delivery-request`;

export const getClassNames = createAsyncThunk(
  'delivery/getClassNames',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/get-class-names',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getClassCount = createAsyncThunk(
  'delivery/getClassCount',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/get-class-count',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getCustomerOnTransitDelivery = createAsyncThunk(
  'delivery/getCustomerOnTransitDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/all-on-transit`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
         console.log("from inside the slice" + JSON.stringify(response.data));
      return response.data; // Return the saved user response
   
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerAllDelivery = createAsyncThunk(
  'delivery/getCustomerAllDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/get-all`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerPendingDelivery = createAsyncThunk(
  'delivery/getCustomerPendingDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/all-pending`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerYetToDeliveredDelivery = createAsyncThunk(
  'delivery/getCustomerYetToDeliveredDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/all-yet-to-delivered`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerDeliveredDelivery = createAsyncThunk(
  'delivery/getCustomerDeliveredDelivery',
   async (prefix,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/all-delivered`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);







 export const getAllDelivery = createAsyncThunk(
   'delivery/getAllDelivery',
   async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/get-all`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 );
 
 
 export const getPendingDelivery = createAsyncThunk(
   'delivery/getPendingDelivery',
   async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-pending`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 );
 
 
 export const getYetToDeliveredDelivery = createAsyncThunk(
   'delivery/getYetToDeliveredDelivery',
   async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-yet-to-delivered`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 );
 
 
 export const getDeliveredDelivery = createAsyncThunk(
   'delivery/getDeliveredDelivery',
    async (prefix,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-delivered`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 );  





export const getDeliveryRequest = createAsyncThunk(
  'delivery/getDelivery',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get/${id}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const updateDeliveryStatusWithFeedBack = createAsyncThunk(
  'delivery/updateDeliveryStatusWithFeedBack',
  async ({deliveryRequestData, deliveryRequestId},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(BASE_URL + `/update-status-with-feedback/${deliveryRequestId}`, deliveryRequestData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const saveDeliveryRequest = createAsyncThunk(
  'delivery/saveDeliveryRequest',
  async (classData,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + '/add', classData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getOnTransitDelivery = createAsyncThunk(
  'delivery/getOnTransitDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/all-on-transit`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
         console.log("from inside the slice" + JSON.stringify(response.data));
      return response.data; // Return the saved user response
   
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const deleteClass = createAsyncThunk(
  'delivery/deleteClass',
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


const deliveryRequestSlice = createSlice({
    name: 'delivery',
    initialState: {

        deliveryRequest: null,
        customerDeliveryRequests: [],
        customerOnTransitDelivery: [],
        customerPendingDelivery: [],
        customerYetToDeliveredDelivery: [],
        customerDeliveredDelivery: [],

         allDeliveryRequests: [],
         onTransitDelivery: [],
         pendingDelivery: [],
         yetToDeliveredDelivery: [],
         deliveredDelivery: [],

     
        savingStatus: 'idle',
        fetchingStatus: 'idle',
        deletingStatus: 'idle',
        getStatus: 'idle',
        updateStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // fetch class names
          .addCase(getClassNames.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getClassNames.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.classNames = action.payload;
          })
          .addCase(getClassNames.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


                // fetch all class
                .addCase(getAllDelivery.pending, (state) => {
                  state.fetchingStatus = 'loading';
                })
                .addCase(getAllDelivery.fulfilled, (state, action) => {
                  state.fetchingStatus = 'succeeded';
                  state.allDeliveryRequests = action.payload;
                })
                .addCase(getAllDelivery.rejected, (state) => {
                  state.fetchingStatus = 'failed';
                })


                   
                .addCase(getCustomerOnTransitDelivery.pending, (state) => {
                  state.fetchingStatus = 'loading';
                })
                .addCase(getCustomerOnTransitDelivery.fulfilled, (state, action) => {
                  state.fetchingStatus = 'succeeded';
                  state.customerOnTransitDelivery = action.payload;
                })
                .addCase(getCustomerOnTransitDelivery.rejected, (state) => {
                  state.fetchingStatus = 'failed';
                })


          .addCase(getCustomerAllDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerAllDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customerDeliveryRequests = action.payload;
          })
          .addCase(getCustomerAllDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




           .addCase(getCustomerPendingDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerPendingDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customerPendingDelivery = action.payload;
          })
          .addCase(getCustomerPendingDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(getCustomerYetToDeliveredDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerYetToDeliveredDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customerYetToDeliveredDelivery = action.payload;
          })
          .addCase(getCustomerYetToDeliveredDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(getCustomerDeliveredDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerDeliveredDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customerDeliveredDelivery = action.payload;
          })
          .addCase(getCustomerDeliveredDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


          


          // ADMIN SPECIFIC


          
                .addCase(getOnTransitDelivery.pending, (state) => {
                  state.fetchingStatus = 'loading';
                })
                .addCase(getOnTransitDelivery.fulfilled, (state, action) => {
                  state.fetchingStatus = 'succeeded';
                  state.OnTransitDelivery = action.payload;
                })
                .addCase(getOnTransitDelivery.rejected, (state) => {
                  state.fetchingStatus = 'failed';
                })



           .addCase(getPendingDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getPendingDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.pendingDelivery = action.payload;
          })
          .addCase(getPendingDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(getYetToDeliveredDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getYetToDeliveredDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.yetToDeliveredDelivery = action.payload;
          })
          .addCase(getYetToDeliveredDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(getDeliveredDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getDeliveredDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.deliveredDelivery = action.payload;
          })
          .addCase(getDeliveredDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



          .addCase(getClassCount.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getClassCount.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.classCount = action.payload;
          })
          .addCase(getClassCount.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })


          
         
          
          // Save Class
          
          .addCase(saveDeliveryRequest.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(saveDeliveryRequest.fulfilled, (state, action) => {
            state.classNamesSpecific = action.payload.classDto;
            state.savingStatus = 'succeeded';
          })
          .addCase(saveDeliveryRequest.rejected, (state) => {
            state.savingStatus = 'failed';
          })

          // delete class

          .addCase(deleteClass.pending, (state) => {
            state.deletingStatus = 'loading';
          })
          .addCase(deleteClass.fulfilled, (state, action) => {
            state.deletingStatus = 'succeeded';
            state.classNamesSpecific = state.classNamesSpecific.filter(classes => classes.id !== action.payload.id);
          })
          .addCase(deleteClass.rejected, (state) => {
            state.deletingStatus = 'failed';
          })

     
          
          // get Delivery Request


          .addCase(getDeliveryRequest.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getDeliveryRequest.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.deliveryRequest = action.payload;
          })
          .addCase(getDeliveryRequest.rejected, (state) => {
            state.getStatus = 'failed';
          })



          
          // Update Status


          .addCase(updateDeliveryStatusWithFeedBack.pending, (state) => {
            state.updateStatus = 'loading';
          })
          .addCase(updateDeliveryStatusWithFeedBack.fulfilled, (state, action) => {
            const index = state.allDeliveryRequests.findIndex(delivery => delivery.id === action.payload.deliveryRequestResponseDto.id);
            if (index !== -1) {
              // Replace the old user object with the updated one
              state.allDeliveryRequests[index] = action.payload.deliveryRequestResponseDto;
            }
            state.updateStatus = 'succeeded';
          })
          .addCase(updateDeliveryStatusWithFeedBack.rejected, (state) => {
            state.updateStatus = 'failed';
          });
      },



});


export default deliveryRequestSlice.reducer;