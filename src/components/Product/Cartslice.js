import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const match = String(price).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const getStoredCart = () => {
  try {
    const item = localStorage.getItem("CartItems");
    if (!item || item === "undefined" || item === "null") return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const calculateTotals = (items) => {
  return (items || []).reduce(
    (acc, item) => {
      const price = parsePrice(item.price);
      const qty = Number(item.cartQuantity || item.quantity || 1);
      acc.total += price * qty;
      acc.quantity += qty;
      return acc;
    },
    { total: 0, quantity: 0 }
  );
};

const initialItems = getStoredCart();
const initialTotals = calculateTotals(initialItems);

const initialState = {
  CartItems: initialItems,
  cartTotalQuantity: initialTotals.quantity,
  cartTotalAmount: parseFloat(initialTotals.total.toFixed(2)),
};

export const Subtotal = (state) => {
  const items = state.cart ? state.cart.CartItems : (state.CartItems || []);
  return calculateTotals(items).total;
};

export const selectCartTotal = (state) => {
  return Subtotal(state);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const existingIndex = state.CartItems.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );

      if (existingIndex >= 0) {
        const currentQty = Number(state.CartItems[existingIndex].cartQuantity || state.CartItems[existingIndex].quantity || 1);
        state.CartItems[existingIndex].cartQuantity = currentQty + 1;
        state.CartItems[existingIndex].quantity = currentQty + 1;
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        const qty = Number(action.payload.cartQuantity || action.payload.quantity || 1);
        let tempProductItem = { 
          ...action.payload, 
          cartQuantity: qty,
          quantity: qty 
        };
        state.CartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }

      const { total, quantity } = calculateTotals(state.CartItems);
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
    },
    increment: (state, action) => {
      const itemIndex = state.CartItems.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (itemIndex !== -1) {
        const currentQty = Number(state.CartItems[itemIndex].cartQuantity || state.CartItems[itemIndex].quantity || 1);
        state.CartItems[itemIndex].cartQuantity = currentQty + 1;
        state.CartItems[itemIndex].quantity = currentQty + 1;
        toast.info("Increased product quantity", {
          position: "bottom-right",
        });

        const { total, quantity } = calculateTotals(state.CartItems);
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = parseFloat(total.toFixed(2));
      }
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
    },
    decrement(state, action) {
      const itemIndex = state.CartItems.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );

      if (itemIndex !== -1) {
        const currentQty = Number(state.CartItems[itemIndex].cartQuantity || state.CartItems[itemIndex].quantity || 1);
        if (currentQty > 1) {
          state.CartItems[itemIndex].cartQuantity = currentQty - 1;
          state.CartItems[itemIndex].quantity = currentQty - 1;
          toast.info("Decreased product quantity", {
            position: "bottom-left",
          });
        } else {
          state.CartItems = state.CartItems.filter(
            (item) => String(item.id) !== String(action.payload.id)
          );
          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }

        const { total, quantity } = calculateTotals(state.CartItems);
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = parseFloat(total.toFixed(2));
      }
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
    },
    Removecart(state, action) {
      state.CartItems = state.CartItems.filter(
        (item) => String(item.id) !== String(action.payload.id)
      );
      const { total, quantity } = calculateTotals(state.CartItems);
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));

      toast.error("Product removed from cart", {
        position: "bottom-left",
      });
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
    },
    getTotals: (state) => {
      const { total, quantity } = calculateTotals(state.CartItems);
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
    Clearcart(state) {
      state.CartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { AddToCart, increment, decrement, Removecart, getTotals, Clearcart } =
  cartSlice.actions;

export default cartSlice.reducer;
