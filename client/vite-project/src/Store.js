import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './StudentSlice';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
