import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlinedIcon } from './icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Removecart, increment, Clearcart, getTotals, decrement, parsePrice } from './Product/Cartslice';
import Total from './Product/Total';
import "../styles/cart.css";

const Cart = () => {
  const { CartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(Removecart(item));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [CartItems, dispatch]);

  const handleSubmit = () => {
    if (!CartItems || CartItems.length === 0) {
      toast.warning("Your cart is empty!", { position: "top-center" });
      return;
    }
    toast.success("Moving to checkout!", {
      position: "top-center"
    });
    navigate("/checkout");
  };

  const handleInc = (item) => {
    dispatch(increment(item));
  };

  const handleDec = (item) => {
    dispatch(decrement(item));
  };

  return (
    <>
      <div className="shop-cart">
        <ToastContainer />
        <h3 style={{ textAlign: "center", paddingTop: "2%" }}>Shopping Cart</h3>
      </div>
      
      {!CartItems || CartItems.length === 0 ? (
        <div className="empty-cart-container" style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Your cart is currently empty</p>
          <Link to="/Shopitem" className="btn btn-dark" style={{ marginTop: "1rem", width: "auto", padding: "0.5rem 1.5rem" }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-display">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead className='table-dark md'>
                <tr>
                  <th scope='col'>Product</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Total</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody className="body-items">
                {CartItems.map((item) => {
                  const itemPrice = parsePrice(item.price);
                  const qty = Number(item.cartQuantity || item.quantity || 1);
                  const rowTotal = itemPrice * qty;
                  return (
                    <tr key={item.id}>
                      <td>
                        <img src={item.img} className='cart-img' alt={item.title} />
                      </td>
                      <td>{item.title}</td>
                      <td>Rs. {itemPrice}</td>
                      <td>
                        <div className="quantity-controls" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <button className='btn btn-light btn-sm' type="button" onClick={() => handleInc(item)}>+</button>
                          <span className='count' style={{ margin: '0 8px', fontWeight: 600 }}>{qty}</span>
                          <button className='btn btn-light btn-sm' type="button" onClick={() => handleDec(item)}>-</button>
                        </div>
                      </td>
                      <td>
                        <div className="total-price" style={{ fontWeight: 600 }}>
                          Rs. {rowTotal.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <button className='btn btn-none' type="button" onClick={() => handleRemove(item)} title="Remove item">
                          <DeleteOutlinedIcon sx={{ color: "red" }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-actions-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            <div className="check">
              <button type='button' className='btn btn-dark' onClick={() => dispatch(Clearcart())}>
                Clear Cart
              </button>
            </div>

            <div className="total-items">
              <Total />
              <div className="cart-cta-buttons" style={{ marginTop: '15px' }}>
                <button type='button' className='btn btn-success' onClick={handleSubmit} style={{ width: '100%', marginBottom: '10px' }}>
                  Proceed to Checkout
                </button>
                <div style={{ textAlign: 'center' }}>
                  <Link to="/Shopitem" className="continue-shopping-link">← Continue Shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
