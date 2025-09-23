import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin: false,
    lastLoginFailed: false,
  },
  reducers:{
    loginSuccess(state){
        state.isAdmin = true;
        state.lastLoginFailed = false;

    },
    loginFailed(state){
        state.isAdmin = false;
        state.lastLoginFailed = true;
    },
    logout(state){
        state.isAdmin = false;
        state.lastLoginFailed = false;
    }
  }
});
export const{loginSuccess,loginFailed,logout} = authSlice.actions;
export default authSlice.reducer;
