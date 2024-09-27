import { configureStore } from '@reduxjs/toolkit';
import emailReadReducer from './slices/EmailReadSlice';

export default configureStore({
  reducer: {
    emailRead: emailReadReducer, // Correctly assign the slice reducer
  },
});
