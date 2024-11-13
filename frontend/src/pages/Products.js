import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const navigate = useNavigate();
  const [products,setProducts] = useState([{id:"dfsdfds", name : "Laptop", price : 15000, stock : 12,categoryName : "Bilgisayar", imageUrl:"pc.jpeg"}]);
  return (
    <div>
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-header'>
            <h2>Product List</h2>
          </div>
          <div className='card-body'>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Processes</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product,index)=>(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td><img src={"http://localhost:5000/"+product.imageUrl} style={{width:"30px"}}/></td>
                      <td>{product.name}</td>
                      <td>{product.categoryName}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className='btn btn-danger btn-sm mx-1'>Delete</button>
                        <button className='btn btn-warning btn-sm mx-1'>Update</button>
                      </td>
                    </tr>
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
