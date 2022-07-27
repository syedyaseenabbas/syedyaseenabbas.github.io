import { OrderItem } from "../../Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  OrderItems: OrderItem[];
  isEmpty: boolean;
  totalSum: number;
}

const initialState: OrderState = {
  OrderItems: [],
  isEmpty: true,
  totalSum: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<OrderItem>) {
      state.OrderItems.unshift(action.payload);
      if (state.isEmpty) state.isEmpty = false;
    },
  },
});

export const { addProduct } = orderSlice.actions;

export default orderSlice.reducer;
