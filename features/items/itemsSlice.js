import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../pages/firebase";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const itemsCollectionRef = collection(db, "items");

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const promise = await getDocs(itemsCollectionRef);
  const items = promise.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("fetched items", items);
  return items
})

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      console.log('items slice', action.payload)
      state.items = action.payload.items;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchItems.pending, (state, action) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(fetchItems.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       state.posts = action.payload
  //     })
  //     .addCase(fetchItems.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message
  //     })
  //     .addCase(addNewPost.fulfilled, (state, action) => {
  //       state.posts.push(action.payload)
  //     })
  // },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
