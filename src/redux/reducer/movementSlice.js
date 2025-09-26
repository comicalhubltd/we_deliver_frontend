// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import api from 'api';
// import api from '../../component/routing/Interceptor';

// const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/movement`;

// export const deleteDeliveryRequest = createAsyncThunk(
//   'delivery/deleteDeliveryRequest',
//   async (id,  { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await api.delete(BASE_URL + `/delete/${id}`, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
//       return response.data; // Return the saved user response
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Something went wrong"});
//     }
//   }
// );


// const movementSlice = createSlice({
//     name: 'movement',
//     initialState: {


     
//         savingStatus: 'idle',
//         fetchingStatus: 'idle',
//         deletingStatus: 'idle',
//         getStatus: 'idle',
//         updateStatus: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder


//           // initiate movement

//           .addCase(deleteDeliveryRequest.pending, (state) => {
//             state.deletingStatus = 'loading';
//           })
//           .addCase(deleteDeliveryRequest.fulfilled, (state, action) => {
//             state.deletingStatus = 'succeeded';
       
//          state.arrivedDelivery = state.arrivedDelivery.filter(request => request.id !== action.payload.id);
           
//           })
//           .addCase(deleteDeliveryRequest.rejected, (state) => {
//             state.deletingStatus = 'failed';
//           });

     
          
//       },



// });


// export default movementSlice.reducer;