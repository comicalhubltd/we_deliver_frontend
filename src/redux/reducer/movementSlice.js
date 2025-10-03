import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/movement`;

export const getMovementsForDriver = createAsyncThunk(
  'movement/getMovementsForDriver',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all-movement-for-driver`, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const toggleMovementStatus = createAsyncThunk(
  'movement/toggleMovementStatus',
  async (requestData,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + '/toggle-delivery-status', requestData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const updateMovementLocation = createAsyncThunk(
  'movement/updateMovementLocation',
  async (requestData,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + '/update-movement-location', requestData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const countDriverDeliveredTask = createAsyncThunk(
  'movement/countDriverDeliveredTask',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/count-delivered-task', { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const countDriverAwaitingTask = createAsyncThunk(
  'movement/countDriverAwaitingTask',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/count-awaiting-transit-task',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const countDriverOnTransitTask = createAsyncThunk(
  'movement/countDriverOnTransitTask',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/count-on-transit-task', { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


const movementSlice = createSlice({
    name: 'movement',
    initialState: {


        movements: [],
        driverDeliveredTask: 0,
        driverAwaitingTask: 0,
        driverOnTransitTask: 0,
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


          // initiate movement

          .addCase(getMovementsForDriver.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getMovementsForDriver.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.movements = action.payload;
           
          })
          .addCase(getMovementsForDriver.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })





           .addCase(countDriverOnTransitTask.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(countDriverOnTransitTask.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.driverOnTransitTask = action.payload;
           
          })
          .addCase(countDriverOnTransitTask.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })




          .addCase(countDriverAwaitingTask.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(countDriverAwaitingTask.fulfilled, (state, action) => {
            state.driverAwaitingTask= action.payload;
            state.fetchingStatus = 'succeeded';           
          })
          .addCase(countDriverAwaitingTask.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })





         .addCase(countDriverDeliveredTask.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(countDriverDeliveredTask.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.driverDeliveredTask = action.payload;
           
          })
          .addCase(countDriverDeliveredTask.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })





           .addCase(updateMovementLocation.pending, (state) => {
            state.deletingStatus = 'loading';
          })
          .addCase(updateMovementLocation.fulfilled, (state, action) => {
            state.deletingStatus = 'succeeded';
     
           
          })
          .addCase(updateMovementLocation.rejected, (state) => {
            state.deletingStatus = 'failed';
          })



          
          
          
                             .addCase(toggleMovementStatus.pending, (state) => {
                               state.deletingStatus = 'loading';
                             })
                             .addCase(toggleMovementStatus.fulfilled, (state, action) => {
                             const index = state.movements.findIndex(
                              movement => movement.deliveryRequest.id === action.payload.deliveryRequestResponseDto.id
                               );

                           if (index !== -1) {
                            // Replace the deliveryRequest object within the movement
                            state.movements[index].deliveryRequest = action.payload.deliveryRequestResponseDto;
                            }
                              state.updateStatus = 'succeeded';
                             })
                             .addCase(toggleMovementStatus.rejected, (state) => {
                               state.deletingStatus = 'failed';
                     })

     
          
      },



});


export default movementSlice.reducer;