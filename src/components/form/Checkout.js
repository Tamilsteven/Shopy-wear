import React, { useState} from 'react'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from "axios";
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/checkout.css";
const Checkout = () => {
  const[Username,setUsername] = useState('');
   const[Email,setEmail] = useState('');
   const[Address1,setAddress1] = useState('');
   const[Address2,setAddress2] = useState('');
   const[City,setCity] = useState('');
   const[States,setStates] = useState('');
   const[Zip,setZip] = useState('');
   const[Cardname,setCardname] = useState('');
   const[Cardnum,setCardnum] = useState('');
   const[Expired ,setExpire] = useState('');
   const[Cvv,setCvv] = useState('');
   const Cart = useSelector((state)=>state.cart);
    //const notify =()=>{toast("Your order successfully submited")};
 
    const handleSubmit=async()=>{
      const error ="something error in your code";
      try{

       const data = axios.post("http://localhost:3100/checkout/",{Username,Email,Address1,
          Address2,City,States,Zip,Cardname,Cardnum,Expired,Cvv}).then((res)=>console.log(res.json())).then((res)=>console.log(res.data)).catch((err)=>console.log(err));

          if(!data ==="ok"){
               console.log(error)
          }
              const response = await data.json();
              console.log(response)
      }catch{
            console.log(error);
      }
          
    }
  return (
         <>
        <h3 style={{textAlign:"center"}}>Checkout Form</h3>
  <div className='containers'>
  <div className='formdata'>
  <h3  style={{textAlign:"center"}}>Billing Address</h3>
 <form className="row"  onSubmit={handleSubmit}>
  <div className="col-md-6">
    <label htmlFor="username" >Username</label>
    <input type="text"  name={Username} className="form-control" id="user" onChange={(e)=>setUsername(e.target.value)} required/>
  </div>
  <div className="col-md-6">
    <label htmlFor="email" >Email</label>
    <input type="email"  name={Email} className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)} required placeholder="user@gmail.com"/>
  </div>
  <div className="col-12">
    <label htmlFor="address" >Address</label>
    <input type="text"   name={Address1} className="form-control" id="inputAddress" required onChange={(e)=>setAddress1(e.target.value)} placeholder="1234 Main St"/>
  </div>
  <div className="col-12">
    <label htmlFor="address2" >Address 2</label>
    <input type="text"   name={Address2} className="form-control" id="inputAddress2" required onChange={(e)=>setAddress2(e.target.value)} placeholder="Apartment, studio, or floor"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="city" >City</label>
    <input type="text" name={City} className="form-control" id="inputCity" required onChange={(e)=>setCity(e.target.value)}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="states" >State</label>
    <select id="inputState" name={States}  required onChange={(e)=>setStates(e.target.value)} className="form-select">
      <option selected>Choose...</option>
      <option>Tamil Ndau</option>
      <option>Andhra Pradesh</option>
      <option>Maharastra</option>
      <option>Haryana</option>
    </select>
  </div>
  <div className="col-md-2">
    <label htmlFor="zip">Zip</label>
    <input type="text" name={Zip} required className="form-control" id="inputZip" onChange={(e)=>setZip(e.target.value)} /> </div>
  {/* <hr className='mb-4'/>
  <div className='row-grid'>
    <label htmlFor="">Shipping address is the same as my billing address</label> <br />
    <input type="checkb ={}ox" name="" id="box"/>
    <label htmlFor= onChange={handleChangeext time</label> <br />
    <input type="checkb ={}ox" name="" id="box" />
  </div> */}
  <div className="col-md-6">
    <label htmlFor="name" >Name on card</label>
    <input type="text" name={Cardname}required className="form-control" id="inputAddress"onChange={(e)=>setCardname(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="cardnum" >Credit card number</label>
    <input type="text" name={Cardnum}className="form-control" required id="inputA "onChange={(e)=>setCardnum(e.target.value)} />
  </div>
  <div className="col-md-3">
    <label htmlFor="expired" >Expiration</label>
    <input type="text" name={Expired} required className="form-control" id="inputAddress" onChange={(e)=>setExpire(e.target.value)}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="cvv">Cvv</label>
    <input type="text" name={Cvv} className="form-control" id="inputAddress" onChange={(e)=>setCvv(e.target.value)}/>
  </div>
  <div className="col-12">
  <button className="btn btn-primary "  required type="submit">Place Order</button>
  <ToastContainer/>
  </div>
</form>
</div>
<div className='final'>
  <h3 style={{marginTop:"10px", fontSize:"25px"}}>&nbsp;Order Summary</h3>
<div className=''>
    {Cart.CartItems.length ===0 ?(
        <p>Cart Empty</p>
    ):(
        <div className="items">
          {Cart.CartItems && 
          Cart.CartItems.map((item,index)=>{
             return(
              <div className="details">
                <ul key={index}>
                <li>Product: {item.title}</li>
                <li>Price: ${item.price} </li>
                </ul>
              </div>
             )
             })}
             
        </div>
          
    )}
  </div> 
  <div className='strng'>Total: ${Cart.cartTotalAmount}</div>
  </div> 
</div>  
<div className='link'>
 <Link to="/shopitem" >Continue Shopping</Link>
  </div> 
 
            </>
      )
}

export default Checkout;