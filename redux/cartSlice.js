import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      //   console.log();
      const {payload} = action;
      const {cartProduct} = payload;

      const isItemInCart = state.find(item => item.id === cartProduct.id);

      if (isItemInCart) {
        return state.map(item =>
          item.id === cartProduct.id ? {...item, ...cartProduct} : item,
        );
      } else {
        return [...state, {...cartProduct}];
      }
    },
    deleteFromCart: (state, action) => {
      const {payload} = action;
      return state.filter(item => item.id !== payload.id);
    },
    reset: () => initialState,
  },
});

export const {addToCart, deleteFromCart, reset} = cartSlice.actions;
export const selectCartLength = state => state.cart.length;
export const selectCart = state => state.cart;
export const selectTotalAmount = state =>
  state.cart.reduce((acc, item) => acc + item.quantityPrice, 0);
export const totalQuantity = state =>
  state.cart.reduce((acc, item) => acc + item.quantity, 0);
export default cartSlice.reducer;
