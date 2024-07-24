import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Order from "./pages/order/Order";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Home from "./pages/home/Home";
import NoPage from "./pages/nopage/NoPage";
import Cart from "./pages/cart/Cart";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from "./pages/allproducts/AllProducts";

export default function App() {
  return ( 
    <MyState>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={<ProtectedRoute>
              <Order />
            </ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/productinfo/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct/></ProtectedRouteForAdmin>} />
        <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct/></ProtectedRouteForAdmin>} />
        <Route path="/*" element={<NoPage/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
    
   );
}

{/*user ke liye protected route jo sirf user hi dekh ske */}
export const ProtectedRoute=({children})=>{
  const user=localStorage.getItem('user')
 // const admin=JSON.parse(localStorage.getItem('user'))
  if(user)
  {
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}

//ab admin ka 
const ProtectedRouteForAdmin=({children})=>
{
  const admin=JSON.parse(localStorage.getItem('user'))

  if(admin.user.email === 'kgupta14_be21@thapar.edu')
  {
    return children
  }
  else 
  {
    return <Navigate to={'/login'}/>
  }
}

 