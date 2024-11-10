import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    bookings: [], // List of bookings
    quantity: 0, // Total quantity of items in the cart
    total: 0, // Total cost of bookings
  },
  reducers: {
    addBooking: (state, action) => {
      const existingBookingIndex = state.bookings.findIndex(booking => booking._id === action.payload._id);

      if (existingBookingIndex === -1) {
        // If booking doesn't exist, add it to the bookings array
        state.bookings.push({ ...action.payload, quantity: 1 }); // Add booking with a quantity of 1
      } else {
        // If the booking already exists, increment the quantity of that booking
        state.bookings[existingBookingIndex].quantity += 1;
      }

      // Update the total quantity and total cost
      state.quantity += 1;
      state.total += action.payload.price;
    },

    removeBooking: (state, action) => {
      const existingBookingIndex = state.bookings.findIndex(booking => booking._id === action.payload._id);

      if (existingBookingIndex !== -1) {
        const existingBooking = state.bookings[existingBookingIndex];

        if (existingBooking.quantity > 1) {
          // If there's more than one of this booking, decrease its quantity
          existingBooking.quantity -= 1;
        } else {
          // If there's only one booking, remove it completely
          state.bookings.splice(existingBookingIndex, 1);
        }

        // Update the total quantity and total cost
        state.quantity -= 1;
        state.total -= existingBooking.price;
      }
    },

    clearCart: (state) => {
      // Reset the cart state
      state.bookings = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addBooking, removeBooking, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
