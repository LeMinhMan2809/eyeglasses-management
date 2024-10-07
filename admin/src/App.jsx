import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductAdd from "./pages/Product/ProductAdd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryAdd from "./pages/Category/CategoryAdd";
import Categories from "./pages/Category/Categories";
import ProductsList from "./pages/Product/ProductsList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div className="flex">
          <div className="w-[20%]">
            <Sidebar />
          </div>

          <div className="w-[80%]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product" element={<ProductsList />} />
              <Route path="/product/add" element={<ProductAdd />} />
              <Route path="/category" element={<Categories />} />
              <Route path="/category/add" element={<CategoryAdd />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
