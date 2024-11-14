import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Home() {
  const [products,setProducts] = useState([]);
  const getAll = async () => {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
  }

  useEffect( () => {
    getAll();
  },[]);

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const model = { product : product, user : user};
    const response = await axios.post("http://localhost:5000/cart/add",model);

    alert(response.data.message);
    getAll();
  }
  return (
    <div className='container'>
      <div className='row'>
        {
          products.map((product,index) => (
            <div className='col-md-3' key={index}>
              <div className='card m-3 w-100'>
              <img src={`https://picsum.photos/200/200?random=${index+1}`} class="card-img-top" alt="..."/>
                <div className='card-body'>
                  <div className='card-header mb-1'>
                    <h3>{product.name}</h3>
                  </div>
                  <h5 className='card-text'>Category : {product.categoryName}</h5>
                  <h5 className='card-text'>Stock : {product.stock}</h5>
                  <h5 className='card-text'>Price : {product.price}</h5>
                  <button className='btn btn-success btn-sm w-100' onClick={() => addToCart(product)}>Add To Cart</button>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}
