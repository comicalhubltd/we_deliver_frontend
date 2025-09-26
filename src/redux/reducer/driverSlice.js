import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from 'api';
import api from '../../component/routing/Interceptor';

const BASE_URL = `${process.env.REACT_APP_API_URL}/v1/api/driver`;

export const saveDriver = createAsyncThunk(
  'driver/saveDriver',
  async (studentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(BASE_URL + '/add', studentData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const allDriverCount = createAsyncThunk(
  'driver/allDriverCount',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + '/count-drivers',  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);





export const updateStudent = createAsyncThunk(
  'class/updateStudent',
  async ({id, studentData},  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(BASE_URL + `/update/${id}`, studentData, { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);




export const getStudentsByClassId = createAsyncThunk(
  'class/getStudentInClassId',
  async (classId,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/all-students-by-classId/${classId}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getAuthenticatedStudentById = createAsyncThunk(
  'teacher/getAuthenticatedStudentById',
  async (_,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-authenticated-student-by-id`,{ headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const getAllDrivers = createAsyncThunk(
  'drivers/getAllDrivers',
  async (_,  { rejectWithValue }) => {
  
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-all`,   { headers: {"Authorization":`Bearer ${JSON.parse(token)}`, "Content-Type":"application/json"}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);


export const getDriverById = createAsyncThunk(
  'class/getDriverById',
  async (id,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(BASE_URL + `/get-driver-by-id/${id}`,  { headers: {"Authorization":`Bearer ${JSON.parse(token)}`}});
      return response.data; // Return the saved user response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong"});
    }
  }
);



export const deleteStudent = createAsyncThunk(
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


const driverSlice = createSlice({
    name: 'Driver',
    initialState: {
        drivers: [],
        driver: [],

        student: null,
        studentsInClass: [],
        studentsInClassByClassId: [],
        driversCount: 0,
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
          .addCase(saveDriver.pending, (state) => {
            state.savingStatus = 'loading';
          })
          .addCase(saveDriver.fulfilled, (state, action) => {
            state.savingStatus = 'succeeded';
        
          })
          .addCase(saveDriver.rejected, (state) => {
            state.savingStatus = 'failed';
          })

          // deleting student

          .addCase(deleteStudent.pending, (state) => {
            state.deletingStatus = 'loading';
          })
          .addCase(deleteStudent.fulfilled, (state, action) => {
            state.deletingStatus = 'succeeded';
            state.studentsInClass = state.studentsInClass.filter(student => student.id !== action.payload.id);
          })
          .addCase(deleteStudent.rejected, (state) => {
            state.deletingStatus = 'failed';
          })
              


                 



                       // Student in a class by classId

                     .addCase(getAllDrivers.pending, (state) => {
                      state.fetchingStatus = 'loading';
                    })
                    .addCase(getAllDrivers.fulfilled, (state, action) => {
                      state.fetchingStatus = 'succeeded';
                      state.drivers = action.payload;
                    })
                    .addCase(getAllDrivers.rejected, (state) => {
                      state.fetchingStatus = 'failed';
                    })


               // Get Authenticated Student By Id
                        
                          .addCase(getAuthenticatedStudentById.pending, (state) => {
                            state.fetchingStatus = 'loading';
                          })
                          .addCase(getAuthenticatedStudentById.fulfilled, (state, action) => {
                            state.fetchingStatus = 'succeeded';
                            state.student = action.payload;
                            
                          })
                          .addCase(getAuthenticatedStudentById.rejected, (state) => {
                            state.fetchingStatus = 'failed';
                          })
              
              





                    // All Student Count

                    .addCase(allDriverCount.pending, (state) => {
                      state.fetchingStatus = 'loading';
                    })
                    .addCase(allDriverCount.fulfilled, (state, action) => {
                      state.fetchingStatus = 'succeeded';
                      state.driversCount = action.payload;
                    })
                    .addCase(allDriverCount.rejected, (state) => {
                      state.fetchingStatus = 'failed';
                    })


         


                         // get Student By Id

                         .addCase(getDriverById.pending, (state) => {
                          state.fetchingStatus = 'loading';
                        })
                        .addCase(getDriverById.fulfilled, (state, action) => {
                          state.fetchingStatus = 'succeeded';
                          state.driver = action.payload;
                        })
                        .addCase(getDriverById.rejected, (state) => {
                          state.fetchingStatus= 'failed';
                        })



                    
                              // Update Status
                    
                    
                              .addCase(updateStudent.pending, (state) => {
                                state.updateStatus = 'loading';
                              })
                              .addCase(updateStudent.fulfilled, (state, action) => {
                                const index = state.studentsInClass.findIndex(user => user.id === action.payload.studentDto.id);
                                if (index !== -1) {
                                  // Replace the old user object with the updated one
                                  state.studentsInClass[index] = action.payload.studentDto;
                                }
                                state.updateStatus = 'succeeded';
                              })
                              .addCase(updateStudent.rejected, (state) => {
                                state.updateStatus = 'failed';
                              });


      },



});

export const { resetStatus } = driverSlice.actions;
export default driverSlice.reducer;