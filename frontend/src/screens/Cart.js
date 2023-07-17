import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE , DROP } from '../slices/cartSlice';

export default function Cart() {

  // On cart page we show the data which is present in the initial State slice 
  // state gives array of objects 

  let data = useSelector(state => state.cart);
  let dispatch = useDispatch(); 

  // data.length == 0 means user ne data add to cart kelach nahi or data check out zala  
  // means state is empty
  if (data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>;
  }


  
  const HandleCheckOut = async()=>{

    let userEmail = localStorage.getItem("userEmail");

    const responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/orderdata`,{
      method:"POST",
      headers :{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "order_data" : data,
        "email" : userEmail,
        "order_date" : new Date().toLocaleString()
      })
    })

    let responceData = await responce.json();

    if(responceData.success){
      dispatch( DROP() );
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ height: '645px', overflow: 'scroll' } } >
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>
            {
            data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn p-0' >
                    <img src= "Delete" alt='delete' 
                    onClick={()=>{dispatch(REMOVE({index: index}))}} 
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={()=>HandleCheckOut()}>Check Out</button>
        </div>
      </div>
    </div>
  );
}

