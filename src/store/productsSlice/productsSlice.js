import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "@constants/api";
import { shuffle } from "../../utils/common";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createProducts = createAsyncThunk(
  "products/createProducts",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, payload);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    filterForRelated: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      console.log("Error in productsSlice");
    });
    builder.addCase(createProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts, filterForRelated } =
  productsSlice.actions;

export default productsSlice.reducer;
