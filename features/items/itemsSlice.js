import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../app/firebase";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  items: null,
  status: "idle",
  error: null,
};

const itemsCollectionRef = collection(db, "items");

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const promise = await getDocs(itemsCollectionRef);
  const items = promise.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;

export const exportAllItems = (state) => state.items.items;
