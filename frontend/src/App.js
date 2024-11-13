import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Admin from './pages/Admin';
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='products' element={<Products />}/>
            <Route path='order' element={<Order />}/>
            <Route path='cart' element={<Cart />}/>
            <Route/>
          </Route>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='admin' element={<Admin />}/>
          <Route path='products/add' element={<CreateProduct/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
