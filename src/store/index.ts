import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducers from "./products/products.slice";
import cartReducer from "./carts/cart.slice";
import orderReducer from "./orders/order.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import type { Reducer } from "@reduxjs/toolkit";
import * as rp from "redux-persist";

const rootReducer = combineReducers({
  productReducers,
  cartReducer,
  orderReducer,
});

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
  stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
  version: 1,
  // blacklist: ["orderReducer"],
};

type CombinedState = typeof rootReducer extends Reducer<infer U, any>
  ? U
  : never;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          rp.FLUSH,
          rp.REHYDRATE,
          rp.PAUSE,
          rp.PERSIST,
          rp.PURGE,
          rp.REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
