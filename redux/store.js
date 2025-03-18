import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    tasks: taskReducer
  },
});

export default store;
