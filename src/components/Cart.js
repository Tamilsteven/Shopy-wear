import React, { useState } from 'react'
import { useEffect } from 'react'
//import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
//import axios from "axios";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
//import { selectAllPost } from './Product/Shopslice'
import { Removecart ,increment,Clearcart,getTotals, decrement} from './Product/Cartslice'
import "../styles/cart.css"


const Cart = () => {
  const Carts = useSelector((state)=>state.cart)
  const{cartTotalAmount,CartItems} = useSelector((state)=>state.cart)
    const[total,setTotal]= useState(0)
  // const cartdata = useSelector((state)=>state.cart.CartItems)
       const navigate = useNavigate()
       const dispatch = useDispatch()
       const handleRemove=(itemId)=>{
               dispatch(Removecart(itemId))
       }
       useEffect(() => {
        dispatch(getTotals);
       
        
      }, [CartItems,dispatch]);
    console.log(Cart);

   
    const handleSubmit= ()=>{
      toast.success("moving to checkout!", {
        position: "top-center"
      });
       navigate("/checkout")         
    }
         const handleInc=(item)=>{
            dispatch(increment(item))
           }
     const handleDec=(item)=>{
                dispatch(decrement(item))
     }
     useEffect(()=>{
      const calculate=()=>{
         const newTotal =CartItems.reduce((sum,next)=>sum+next.price*next.cartQuantity,0)
         setTotal(newTotal);
      }
      calculate();
     },[CartItems])  

  return (
    <>
    <div className="shop-cart">
      <ToastContainer/>
 <h3 style={{textAlign:"center", paddingTop:"2%"}}>Shopping Cart</h3>
    </div>
     {Carts.CartItems.length ===0 ?(
      <p style={{textAlign:"center", paddingTop:"-2%"}}>Your cart is empty</p>
     ): (
      <div className="cart-display">
      <table className="table table-sm">
                
                   <thead className='table-dark md' >
                    <tr>
                      <th scope='col'>Product</th>
                      <th scope='col'>Title</th>
                      <th scope='col'>price</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Total</th>
                      <th scope='col'>Actions</th>
                    </tr>
                   </thead>
        {Carts.CartItems&&
        Carts.CartItems.map((item)=>(
              
            <tbody className="body-items" >  
              <tr key={item.id} >
                <td>
                <img src={item.img} className='cart-img' alt="" />
                </td>
               <td >{item.title}</td>
               <td >{item.price}</td>
               <td>
                <button className='btn btn-light sm-1'onClick={()=>handleInc(item)} >+</button>&nbsp;
                <span className='count'>{item.cartQuantity}</span>
                <button className='btn btn-light sm-1' onClick={()=>handleDec(item)}>-</button>
                </td>
                <td>
                <div className="total-price">
                    {item.price* item.cartTotalQuantity}
                  </div>
                </td>
               <td >
               <button  className='btn btn-none' onClick={()=>handleRemove(item)}><DeleteOutlinedIcon sx={{ color:"red"}}/></button>
               </td> 
               </tr>
            </tbody>
            
             
        ))
             }
          <div className="check">
            <button type='submit' className='btn btn-dark' onClick={()=>dispatch(Clearcart())}>Clear</button>
            </div>
            
      </table>

     
      <div className="total-items">
      <div>{total}</div>
         <div>Subtotal: ${cartTotalAmount}</div>
        <button type='submit' className='btn btn-success' onClick={handleSubmit}>Checkout</button><br />
        <Link to="/Shopitem">Continue Shopping</Link>
      </div>
        
      </div>
     )}
    </>
  )
}

export default Cart;