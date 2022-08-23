import {configureStore, combineReducers, createReducer} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
