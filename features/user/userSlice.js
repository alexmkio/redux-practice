import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc, deleteField } from "firebase/firestore";
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
      state.id = action.payload.uid;
      state.emailAddress = action.payload.email;
      state.cart = action.payload.cart;
    },
    incrementItemCount: (state, action) => {
      let user = { ...state };
      if (user.cart[action.payload]) {
        let itemInCart = user.cart[action.payload];
        let docRef = `cart.${action.payload}.qty`;
        let updatedAmount = itemInCart.qty + 1;
        let update = {
          [docRef]: updatedAmount,
        };
        updateDoc(doc(db, "users", user.id), update);
      } else {
        let docRef = `cart.${action.payload}`;
        let update = {
          [docRef]: {
            qty: 1,
          },
        };
        updateDoc(doc(db, "users", user.id), update);
      }
    },
    decrementItemCount: (state, action) => {
      let user = { ...state };
      let itemInCart = user.cart[action.payload];
      let updatedAmount = itemInCart.qty - 1;
      if (updatedAmount > 0) {
        let fieldRef = `cart.${action.payload}.qty`;
        let update = {
          [fieldRef]: updatedAmount,
        };
        updateDoc(doc(db, "users", user.id), update);
      } else {
        let fieldRef = `cart.${action.payload}`;
        updateDoc(doc(db, "users", user.id), {
          [fieldRef]: deleteField(),
        });
      }
    },
  },
});

export const { setUser, incrementItemCount, decrementItemCount } =
  userSlice.actions;

export default userSlice.reducer;
