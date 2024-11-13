import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate()
  const [userName,setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Register Metodu
  const register = async (e) => {
    e.preventDefault();
    let model = {userName : userName, email : email, password : password};
    try {
      const response = await axios.post("http://localhost:5000/auth/register",model);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user));
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header bg-success">
              <h3 className="text-light text-center">Register Page</h3>
            </div>
            <div className="card-body pb-1">
              <form onSubmit={register}>
                <div className="form-group mb-3 row">
                  <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="form-control"
                      id="username"
                      placeholder="username"
                    />
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mb-3 row p-2">
                  <button type="submit" className="btn btn-success w-100 ">Sign Up</button>
                  <Link className="mt-2 btn btn-secondary" to="/login">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
