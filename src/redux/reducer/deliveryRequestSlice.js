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


export const getCustomerAwaitingTransitDelivery = createAsyncThunk(
  'delivery/getCustomerAwaitingTransitDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/all-awaiting-transit`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);




export const getCustomerViewFeedback = createAsyncThunk(
  'delivery/getCustomerViewFeedback',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/customer/view-feedback`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCustomerRejectedDelivery = createAsyncThunk(
   'delivery/getCustomerRejectedDelivery',
    async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/customer/all-rejected`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 ); 



 export const getCustomerArrivedDelivery = createAsyncThunk(
   'delivery/getCustomerArrivedDelivery',
    async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/customer/all-arrived`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
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
 
 
 export const getAwatingTransitDelivery = createAsyncThunk(
   'delivery/getAwatingTransitDelivery',
   async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-awating-transit`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 );



 export const getAwatingTransitAndPendingDelivery = createAsyncThunk(
   'delivery/getAwatingTransitAndPendingDelivery',
   async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-pending-and-awaiting`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
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



 export const getRejectedDelivery = createAsyncThunk(
   'delivery/getRejectedDelivery',
    async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-rejected`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
       return response.data; // Return the saved user response
     } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
     }
   }
 ); 



 export const getArrivedDelivery = createAsyncThunk(
   'delivery/getArrivedDelivery',
    async (_,  { rejectWithValue }) => {
     try {
       const token = localStorage.getItem('token');
       const response = await api.get(BASE_URL + `/all-arrived`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
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



export const getCountDelivered = createAsyncThunk(
  'delivery/getCountDelivered',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/count-delivered`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getCountPending = createAsyncThunk(
  'delivery/getCountPending',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/count-pending`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getCountDelivery = createAsyncThunk(
  'delivery/countDelivery',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/count-all`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
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



export const updateDeliveryRequest = createAsyncThunk(
  'delivery/updateDeliveryRequest',
  async ({deliveryRequestData, deliveryRequestId},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(BASE_URL + `/update-delivery/${deliveryRequestId}`, deliveryRequestData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
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


export const initiateMovement = createAsyncThunk(
  'delivery/initiateMovement',
  async ({deliveryId, driverId},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/add-movement/${deliveryId}/${driverId}`,{}, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const deleteDeliveryRequest = createAsyncThunk(
  'delivery/deleteDeliveryRequest',
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
        customerAwaitingTransitDelivery: [],
        customerDeliveredDelivery: [],
        customerRejectedDelivery: [],
        customerArrivedDelivery: [],
        customerViewFeedback: [],

         awaitingAndPendingTransitDelivery: [],
         allDeliveryRequests: [],
         onTransitDelivery: [],
         pendingDelivery: [],
         awaitingTransitDelivery: [],
         deliveredDelivery: [],
         rejectedDelivery: [],
         arrivedDelivery: [],

         countDelivered: 0,
         countPending: 0,
         countDelivery: 0,

     
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



                .addCase(getCustomerViewFeedback.pending, (state) => {
                  state.fetchingStatus = 'loading';
                })
                .addCase(getCustomerViewFeedback.fulfilled, (state, action) => {
                  state.fetchingStatus = 'succeeded';
                  state.customerViewFeedback = action.payload;
                })
                .addCase(getCustomerViewFeedback.rejected, (state) => {
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




          .addCase(getCustomerAwaitingTransitDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getCustomerAwaitingTransitDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.customerAwaitingTransitDelivery = action.payload;
          })
          .addCase(getCustomerAwaitingTransitDelivery.rejected, (state) => {
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
                  state.onTransitDelivery = action.payload;
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




          .addCase(getAwatingTransitDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getAwatingTransitDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.awaitingTransitDelivery = action.payload;
          })
          .addCase(getAwatingTransitDelivery.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })



            .addCase(getAwatingTransitAndPendingDelivery.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getAwatingTransitAndPendingDelivery.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.awaitingAndPendingTransitDelivery = action.payload;
          })
          .addCase(getAwatingTransitAndPendingDelivery.rejected, (state) => {
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

          .addCase(deleteDeliveryRequest.pending, (state) => {
            state.deletingStatus = 'loading';
          })
          .addCase(deleteDeliveryRequest.fulfilled, (state, action) => {
            state.deletingStatus = 'succeeded';
        state.customerDeliveryRequests = state.customerDeliveryRequests.filter(request => request.id !== action.payload.id);
        state.customerOnTransitDelivery = state.customerOnTransitDelivery.filter(request => request.id !== action.payload.id);
        state.customerPendingDelivery = state.customerPendingDelivery.filter(request => request.id !== action.payload.id);
        state.customerAwaitingTransitDelivery = state.customerAwaitingTransitDelivery.filter(request => request.id !== action.payload.id);
        state.customerDeliveredDelivery = state.customerDeliveredDelivery.filter(request => request.id !== action.payload.id);
        state.customerRejectedDelivery = state.customerRejectedDelivery.filter(request => request.id !== action.payload.id);
        state.customerArrivedDelivery = state.customerArrivedDelivery.filter(request => request.id !== action.payload.id);

         state.allDeliveryRequests = state.allDeliveryRequests.filter(request => request.id !== action.payload.id);
         state.onTransitDelivery = state.onTransitDelivery.filter(request => request.id !== action.payload.id);
         state.pendingDelivery = state.pendingDelivery.filter(request => request.id !== action.payload.id);
         state.awaitingTransitDelivery = state.awaitingTransitDelivery.filter(request => request.id !== action.payload.id);
         state.deliveredDelivery = state.deliveredDelivery.filter(request => request.id !== action.payload.id);
         state.rejectedDelivery = state.rejectedDelivery.filter(request => request.id !== action.payload.id);
         state.arrivedDelivery = state.arrivedDelivery.filter(request => request.id !== action.payload.id);
           
          })
          .addCase(deleteDeliveryRequest.rejected, (state) => {
            state.deletingStatus = 'failed';
          })






         .addCase(initiateMovement.pending, (state) => {
          state.deletingStatus = 'loading';
          })
          .addCase(initiateMovement.fulfilled, (state, action) => {
          state.deletingStatus = 'succeeded';
          state.awaitingAndPendingTransitDelivery = state.awaitingAndPendingTransitDelivery.filter(request => request.id !== action.payload.id);
        
          })
          .addCase(initiateMovement.rejected, (state) => {
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



           .addCase(getCountDelivered.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getCountDelivered.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.countDelivered = action.payload;
          })
          .addCase(getCountDelivered.rejected, (state) => {
            state.getStatus = 'failed';
          })



             .addCase(getCountPending.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getCountPending.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.countPending = action.payload;
          })
          .addCase(getCountPending.rejected, (state) => {
            state.getStatus = 'failed';
          })


            .addCase(getCountDelivery.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getCountDelivery.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.countDelivery = action.payload;
          })
          .addCase(getCountDelivery.rejected, (state) => {
            state.getStatus = 'failed';
          })


             .addCase(getCustomerRejectedDelivery.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getCustomerRejectedDelivery.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.customerRejectedDelivery = action.payload;
          })
          .addCase(getCustomerRejectedDelivery.rejected, (state) => {
            state.getStatus = 'failed';
          })



            .addCase(getRejectedDelivery.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getRejectedDelivery.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.rejectedDelivery = action.payload;
          })
          .addCase(getRejectedDelivery.rejected, (state) => {
            state.getStatus = 'failed';
          })



            .addCase(getArrivedDelivery.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getArrivedDelivery.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.arrivedDelivery = action.payload;
          })
          .addCase(getArrivedDelivery.rejected, (state) => {
            state.getStatus = 'failed';
          })



           .addCase(getCustomerArrivedDelivery.pending, (state) => {
            state.getStatus = 'loading';
          })
          .addCase(getCustomerArrivedDelivery.fulfilled, (state, action) => {
            state.getStatus = 'succeeded';
            state.customerArrivedDelivery = action.payload;
          })
          .addCase(getCustomerArrivedDelivery.rejected, (state) => {
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
          })




          
          .addCase(updateDeliveryRequest.pending, (state) => {
            state.updateStatus = 'loading';
          })
          .addCase(updateDeliveryRequest.fulfilled, (state, action) => {
            const index = state.allDeliveryRequests.findIndex(delivery => delivery.id === action.payload.deliveryRequestResponseDto.id);
            if (index !== -1) {
              // Replace the old user object with the updated one
              state.allDeliveryRequests[index] = action.payload.deliveryRequestResponseDto;
            }
            state.updateStatus = 'succeeded';
          })
          .addCase(updateDeliveryRequest.rejected, (state) => {
            state.updateStatus = 'failed';
          });
      },



});


export default deliveryRequestSlice.reducer;