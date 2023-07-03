import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const initialState = {
  email: "",
  username:"",
  image: "",
    id: "",
    token: "",
  roles:[]
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload);
     // state.user = action.payload.data;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
          state.image = action.payload.image;
          state.token = action.payload.token;
          state.roles = action.payload.roles;
    },
    logoutRedux: (state, action) => {
      state.id = "";
      state.username = "";
      state.email = "";
        state.image = "";
        state.token = ""
        state.roles = [];
        
     
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;
