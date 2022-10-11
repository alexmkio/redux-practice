import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../pages/firebase";

const initialState = {
  id: null,
  emailAddress: null,
  cart: null,
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
    incrementItemCount: (state, action) => {
      let user = { ...state };
      let itemInCart = user.cart[action.payload];
      if (itemInCart) {
        let docRef = `cart.${action.payload}.qty`;
        let updatedAmount = itemInCart.qty + 1;
        let update = {
          [docRef]: updatedAmount,
        };
        updateDoc(doc(db, "users", user.id), update);
      }
    },
    decrementItemCount: (state, action) => {
      let user = { ...state };
      let itemInCart = user.cart[action.payload];
      if (itemInCart) {
        let docRef = `cart.${action.payload}.qty`;
        let updatedAmount = itemInCart.qty - 1;
        let update = {
          [docRef]: updatedAmount,
        };
        updateDoc(doc(db, "users", user.id), update);
      }
    },
  },
});

export const { setUser, incrementItemCount, decrementItemCount } =
  userSlice.actions;

export default userSlice.reducer;
