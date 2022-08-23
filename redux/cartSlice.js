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
    deleteFromCart: (state, action) => {},
    reset: () => initialState,
  },
});

export const {addToCart, deleteFromCart, reset} = cartSlice.actions;

export default cartSlice.reducer;
