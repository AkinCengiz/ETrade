import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Products() {
  //const navigate = useNavigate();
  const [products,setProducts] = useState([]);

  const getAll = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  }

  useEffect(() => {
    getAll();
  },[]);

  const removeProduct = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete the product?");
    if(confirm){
      const model = { _id : id };
      const response = await axios.post("http://localhost:5000/products/remove",model);
      alert(response.data.message);
      getAll();
    }
  }

  return (
    <div>
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-header d-flex justify-content-between'>
            <h2>Product List</h2>
            <Link to="/products/add" className='btn btn-success btn-sm'>Add</Link>
          </div>
          <div className='card-body'>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  {/* <th>Image</th> */}
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
                      {/* <td><img src={"http://localhost:5000/"+product.imageUrl} style={{width:"30px"}}/></td> */}
                      <td>{product.name}</td>
                      <td>{product.categoryName}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className='btn btn-danger btn-sm mx-1' onClick={() => removeProduct(product._id)}>Delete</button>
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
