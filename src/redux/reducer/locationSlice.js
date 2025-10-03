import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/location`;


export const getAllLocationOnTransit = createAsyncThunk(
  'location/getAllLocationOnTransit',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/get-all-location-on-transit',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);






export const getAllCustomerLocationOnTransit = createAsyncThunk(
  'location/getAllCustomerLocationOnTransit',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(BASE_URL + '/get-all-customer-location',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`, "Content-Type":"application/json"}});
      console.log("Set Current Session " + response.data);
      return response.data; // Return the saved user response
      
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getAllSession = createAsyncThunk(
  'session/getAllSession',
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


const locationSlice = createSlice({
    name: 'Location',
    initialState: {
        locations: [],
        savingStatus: 'idle',
        fetchingStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        
          // save session

          .addCase(getAllLocationOnTransit.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(getAllLocationOnTransit.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
            state.locations = action.payload;
         
          })
          .addCase(getAllLocationOnTransit.rejected, (state) => {
            state.savingStatus = 'failed';
          })

               // get All Session
            
            .addCase(getAllSession.pending, (state) => {
                state.fetchingStatus = 'loading';
              })
              .addCase(getAllSession.fulfilled, (state, action) => {
                state.fetchingStatus = 'succeeded';
                state.sessions = action.payload;
              })
              .addCase(getAllSession.rejected, (state) => {
                state.fetchingStatus = 'failed';
              })


                  // get Session by ID

          .addCase(getAllCustomerLocationOnTransit.pending, (state) => {
            state.fetchingStatus = 'loading';
          })
          .addCase(getAllCustomerLocationOnTransit.fulfilled, (state, action) => {
            state.fetchingStatus = 'succeeded';
            state.locations = action.payload;
          })
          .addCase(getAllCustomerLocationOnTransit.rejected, (state) => {
            state.fetchingStatus = 'failed';
          })
      },
});


export default locationSlice.reducer;