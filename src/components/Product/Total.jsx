import React from 'react';
import { useSelector } from 'react-redux';
import { parsePrice } from './Cartslice';

const Total = () => {
  const { CartItems, cartTotalAmount, cartTotalQuantity } = useSelector((state) => state.cart);

  const totalQuantity = (CartItems || []).reduce(
    (sum, item) => sum + Number(item.cartQuantity || item.quantity || 1),
    0
  );

  const subtotal = (CartItems || []).reduce(
    (sum, item) => sum + parsePrice(item.price) * Number(item.cartQuantity || item.quantity || 1),
    0
  );

  return (
    <div className="cart-total-box">
      <h4 className="cart-total-title">Cart Totals</h4>
      <div className="cart-total-row">
        <span>Total Items:</span>
        <strong>{totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}</strong>
      </div>
      <div className="cart-total-row">
        <span>Subtotal:</span>
        <span>Rs. {subtotal.toFixed(2)}</span>
      </div>
      <div className="cart-total-row">
        <span>Shipping:</span>
        <span style={{ color: "#198754", fontWeight: 600 }}>FREE</span>
      </div>
      <div className="cart-total-row">
        <span>Estimated Tax:</span>
        <span>Included (0%)</span>
      </div>
      <hr className="cart-total-divider" />
      <div className="cart-total-row grand-total">
        <span>Total:</span>
        <strong>Rs. {subtotal.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Total;
