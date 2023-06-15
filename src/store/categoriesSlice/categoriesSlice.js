import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from '@constants/api'

export const fetchCategories = createAsyncThunk(
    "categories/getCategories",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios(`${BASE_URL}/categories`)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  );


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.list = payload
        })
        builder.addCase(fetchCategories.rejected, (state, { payload }) => {
            state.isLoading = false
        })
    }
})

export default categoriesSlice.reducer;