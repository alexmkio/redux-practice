import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  emailAddress: "",
  cart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.emailAddress = action.payload.email;
      state.cart = action.payload.cart;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
