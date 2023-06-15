import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoriesSlice from "@store/categoriesSlice/categoriesSlice";
import productsSlice from "@store/productsSlice/productsSlice";
import userSlice from "@store/userSlice/userSlice";

import { apiSlice } from "./api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;
