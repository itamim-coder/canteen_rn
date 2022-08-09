import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredCart = async () => {
  let shoppingCart = {};

  //get shopping cart
  const storedCart = await AsyncStorage.getItem('shopping-cart');
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  } else {
    shoppingCart = {};
  }
  return shoppingCart;
};
