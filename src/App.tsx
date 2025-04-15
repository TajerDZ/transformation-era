import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./lib/i18n";
import Login from "./Pages/Auth/Login";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import SingUp from "./Pages/Auth/SingUp";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Layout from "./Pages/Dashboard/Layout";
import Home from "./Pages/Dashboard/Home";
import Products from "./Pages/Dashboard/Products";
const cookies = new Cookies(null, { path: "/" });
function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (cookies.get("lang")) {
      i18n.changeLanguage(cookies.get("lang"));
    } else {
      i18n.changeLanguage("ar");
    }

    if (i18n.dir() === "rtl") {
      if (document) {
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
          htmlElement.setAttribute("dir", "rtl");
        }
      }
    }
  }, [i18n]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="store" element={<div>Store</div>} />
          <Route path="bills" element={<div>Bills</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
