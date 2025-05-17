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
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Dashboard/Profile";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import Store from "./Pages/Dashboard/Store";
import Hosting from "./Pages/Dashboard/Hosting";
import Bills from "./Pages/Dashboard/Bills";
import Notification from "./Pages/Dashboard/Notification";
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
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":orderId">
              <Route index element={<Dashboard />} />
              <Route path="renewal" element={<div>Renewal</div>} />
              <Route path="hosting" element={<div>Hosting</div>} />
              <Route path="domains" element={<div>Domains</div>} />
              <Route path="ssl" element={<div>SSL</div>} />
            </Route>
          </Route>
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="store">
            <Route index element={<Store />} />
            <Route path=":idProduct" element={<Hosting />} />
          </Route>
          <Route path="bills" element={<Bills />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
