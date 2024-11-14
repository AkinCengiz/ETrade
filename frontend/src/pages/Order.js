import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import axios from "axios";

export default function Order() {
  const [orders,setOrders] = useState([
    {id:1,
      products : [
        { id:1, name:"order1 deneme1", price : 100, amount : 10},
        { id:2, name:"order2 deneme2", price : 200, amount : 20}
      ]
    },
    {id:2,
      products : [
        { id:21, name:"order21 deneme21", price : 2100, amount : 210},
        { id:22, name:"order22 deneme22", price : 2200, amount : 220}
      ]
    }
  ]);
  return (
    <div>
    <div className='container mt-3'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h2>Order List</h2>
          <Link to="/products/add" className='btn btn-success btn-sm'>Add</Link>
        </div>
        <div className='card-body'>
        <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  {/* <th>Image</th> */}
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Processes</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((order,i)=>(
                    order.products.map((product) => (
                      <tr key={i}>
                      <td>{order.id}</td>
                      {/* <td><img src={"http://localhost:5000/"+product.imageUrl} style={{width:"30px"}}/></td> */}
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.amount}</td>
                      <td>{Number(product.price) * Number(product.amount)}</td>
                      <td>
                        <button className='btn btn-danger btn-sm mx-1' onClick={setOrders} >Delete</button>
                        <button className='btn btn-warning btn-sm mx-1'>Update</button>
                      </td>
                    </tr>
                    ))                    
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  )
}
