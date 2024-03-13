import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Topnav from "./components/Topnav";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import CartPage from "./pages/CartPage";
// import Order from "./pages/Order";
// import PostOrderPage from "./pages/PostOrderPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
function App() {
  const { isLoggedIn,token } = useAuth();
  console.log("token",token)
  const PrivateRoute = ({ element, ...props }) => {
    console.log("Token is:", token); // Logging the token value
    if (token!==null && token!==undefined && token!=='null') {
      console.log("Rendering element");
      return React.cloneElement(element, props);
    } else {
      console.log("Redirecting to login");
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="App">
      {/* <Topnav />
      <Navbar /> */}
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} /> 
         <Route
          path="/"
          element={<PrivateRoute element={<Home />} />}
        />
        {/* <Route
          path="/products"
          element={<PrivateRoute element={<Products />} />}
        />
        <Route
          path="/products/:id"
          element={<PrivateRoute element={<ProductDetailsPage />} />}
        />
        <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<Order />} />}
        />
        <Route
          path="/orderplaced"
          element={<PrivateRoute element={<PostOrderPage />} />}
        />  */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;