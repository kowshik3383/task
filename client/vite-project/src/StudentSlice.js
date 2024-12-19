import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://task-tfsg.onrender.com/students';

// Fetch all students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new student
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
});

// Update a student
export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, student }) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
});

// Delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex((student) => student.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((student) => student.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
