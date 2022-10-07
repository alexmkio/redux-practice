import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import itemsReducer from "../features/items/itemsSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});
