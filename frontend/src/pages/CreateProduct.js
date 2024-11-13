import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");

    const createProduct = async (e) => {
        e.preventDefault();
        const model = {name : name, categoryName : categoryName, stock : stock, price : price};
        try {
            const response = await axios.post("http://localhost:5000/products/add",model);
            alert(response.data.message);
            navigate("/products");
        } catch (error) {
            
        }

    }
  return (
    <div>
        <div className='d-flex justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='card'>
              <div className='card-header bg-primary'>
                <h3 className='text-light text-center'>Create Product</h3>
              </div>
              <div className='card-body pb-1'>
                <form>
                <div className="form-group mb-3 row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Product Name</label>
                  <div className="col-sm-10">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" name='name' placeholder="Product name"/>
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="category" className="col-sm-2 col-form-label">Category Name</label>
                  <div className="col-sm-10">
                    <input id="category" name='category' type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" placeholder='Category name'/>
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="stock" className="col-sm-2 col-form-label">Stock Amount</label>
                  <div className="col-sm-10">
                    <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="form-control" id="stock" name='stock' placeholder="Stock amount"/>
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                  <div className="col-sm-10">
                    <input type="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" placeholder='Price'/>
                  </div>
                </div>
                <div className="form-group mb-3 row p-2">
                    <button type='submit' className='btn btn-primary w-100' onClick={createProduct}>Add Product</button>
                </div>
                </form>              
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
