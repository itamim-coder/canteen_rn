import {
  configureStore,
  combineReducers,
  createReducer,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import cartReducer from './cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import authSlice from './authSlice';
// import {get} from 'react-native/Libraries/Utilities/PixelRatio';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['counter'],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;
