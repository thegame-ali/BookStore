import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.cartItems);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('auth/logout', (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, } = cartSlice.actions;
export default cartSlice.reducer;
