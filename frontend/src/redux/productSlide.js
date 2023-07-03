import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
    cartItem: [],
    cartId: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
          state.productList = [...action.payload];
          console.log(state.productList);
      },
      setCartItem: (state, action) => {
          state.cartItem = [...action.payload.cartItems];
          console.log(state.cartItem);
      },
      setCartId: (state, action) => {
          state.cartId = action.payload.id;
          console.log(state.cartId);
      },
    addCartItem: (state, action) => {
        const check = state.cartItem.some((el) => el.productId === action.payload.productId);
      if (check) {
        toast("Already Item in Cart");
      } else {
        //toast("Item Add successfully");
          const total = action.payload.price;

        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, quantity: 1, total: total },
        ];
      }
    },
      deleteCartItem: (state, action) => {
        toast("Đã xóa khỏi giỏ hàng" );
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      let qty = state.cartItem[index].quantity;
      const qtyInc = ++qty;
        state.cartItem[index].quantity = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
        let qty = state.cartItem[index].quantity;
      if (qty > 1) {
        const qtyDec = --qty;
          state.cartItem[index].quantity = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setCartItem,
  setCartId
} = productSlice.actions;

export default productSlice.reducer;
