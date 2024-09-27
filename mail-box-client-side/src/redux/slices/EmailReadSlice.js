import { createSlice } from '@reduxjs/toolkit';

export const emailReadSlice = createSlice({
  name: 'EmailReadSlice',
  initialState: {
    value: false,
  },
  reducers: {
    emailTap: (state) => {
      state.value = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { emailTap } = emailReadSlice.actions;

export default emailReadSlice.reducer;
