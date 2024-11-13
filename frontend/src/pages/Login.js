import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const login = async(e) => {
    e.preventDefault();
    try {
      let model = { email : email, password : password};
      let response = await axios.post("http://localhost:5000/auth/login",model)
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      
    }
  }
  return (
    <div>
      <div className='d-flex justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='card'>
              <div className='card-header bg-primary'>
                <h3 className='text-light text-center'>Login Page</h3>
              </div>
              <div className='card-body pb-1'>
                <form onSubmit={login}>
                <div className="form-group mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name='email' placeholder="email@example.com"/>
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" value={password} onChange={changePassword} className="form-control" id="password"/>
                  </div>
                </div>
                <div className="form-group mb-3 row p-2">
                    <button type='submit' className='btn btn-primary w-100 '>Sign In</button>
                    <Link className='mt-2 btn btn-info' to="/register">Sign Up</Link>
                </div>
                </form>              
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
