import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userData: {},
  students: [],
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
    saveUserData(state, action) {
      state.userData = action.payload;
    },
    saveStudentList(state, action) {
      state.students = action.payload;
    },
    resetUserData(state) {
      state.accessToken = null;
      state.userData = null;
    },
  },
});

export const { setAccessToken, saveUserData, saveStudentList, resetUserData } =
  appSlice.actions;
export default appSlice.reducer;
