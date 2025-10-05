import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../component/routing/Interceptor';
// import api from 'api';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/password`;

export const sendPasswordRequestCustomer = createAsyncThunk(
  'teacher/sendPasswordRequestCustomer',
  async (email, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/save-password-request-customer/${email}`, {}, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const sendPasswordRequestDriver = createAsyncThunk(
  'teacher/sendPasswordRequestDriver',
  async (email, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/save-password-request-customer/${email}`, {}, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



export const sendPasswordReset = createAsyncThunk(
  'password/sendPasswordReset',
  async (passwordResetRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/save-reset-password`, passwordResetRequest, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`, "Content-Type":"application/json"}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const sendPasswordResetCustomer = createAsyncThunk(
  'password/sendPasswordResetCustomer',
  async (passwordResetRequest, { rejectWithValue }) => {
    try {
      console.log(passwordResetRequest)
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/save-reset-password-customer`, passwordResetRequest, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`, "Content-Type":"application/json"}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const sendPasswordResetDriver = createAsyncThunk(
  'password/sendPasswordResetDriver',
  async (passwordResetRequest, { rejectWithValue }) => {
    try {
      console.log(passwordResetRequest)
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + `/save-reset-password-driver`, passwordResetRequest, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`, "Content-Type":"application/json"}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const getTeacherCount = createAsyncThunk(
  'teacher/allTeacherCount',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/get-teachers-count',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);





export const getTeacherById = createAsyncThunk(
  'teacher/getTeacherById',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-by-id/${id}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



const passwordSlice = createSlice({
    name: 'teacher',
    initialState: {
        passwords: [],
        savingStatus: 'idle',
        fetchingStatus: 'idle',
        deletingStatus: 'idle',
        existsStatus: 'idle',
        error: null,
    },
    reducers: {
      resetStatus (state) {
        state.status = 'idle';
        state.error = null;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(sendPasswordRequestCustomer.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(sendPasswordRequestCustomer.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
           
          })
          .addCase(sendPasswordRequestCustomer.rejected, (state) => {
            state.savingStatus = 'failed';
          })




            .addCase(sendPasswordRequestDriver.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(sendPasswordRequestDriver.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
           
          })
          .addCase(sendPasswordRequestDriver.rejected, (state) => {
            state.savingStatus = 'failed';
          })


           .addCase(sendPasswordReset.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(sendPasswordReset.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
           
          })
          .addCase(sendPasswordReset.rejected, (state) => {
            state.savingStatus = 'failed';
          })

          
          // Save Password request student

          .addCase(sendPasswordResetCustomer.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(sendPasswordResetCustomer.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
           
          })
          .addCase(sendPasswordResetCustomer.rejected, (state) => {
            state.savingStatus = 'failed';
          })



          // Save Teacher request student

          .addCase(sendPasswordResetDriver.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(sendPasswordResetDriver.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
           
          })
          .addCase(sendPasswordResetDriver.rejected, (state) => {
            state.savingStatus = 'failed';
          })



     

            // Get Teacher By Id
          
            .addCase(getTeacherById.pending, (state) => {
              state.fetchingStatus = 'loading';
            })
            .addCase(getTeacherById.fulfilled, (state, action) => {
              state.fetchingStatus = 'succeeded';
              state.teacher = action.payload;
              
            })
            .addCase(getTeacherById.rejected, (state) => {
              state.fetchingStatus = 'failed';
            });
            
            
      },

});

export const { resetStatus } = passwordSlice.actions;
export default passwordSlice.reducer;