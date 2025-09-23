// App.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import FormMenuView from "../View/MenuForm";
import BeverageQueue from "../View/BeverageQueue";
import Collected from "./Collected";
import AdminLogin from "./AdminLogin";
import ErrorPage from "./Error";
import Navbar from "./NavBar";
import BevStore from "../utils/ReduxStore/BevStore";
import { logout } from "../utils/ReduxStore/authSlice";
import "../style/NavBar.css";
import "../style/form.css";
import "../style/Media.css";

function AppRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "/queue") {
      localStorage.removeItem("isAdmin");
      dispatch(logout());
    }
  }, [location, dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FormMenuView />} />
        <Route path="/queue" element={<BeverageQueue />} />
        <Route path="/queue/collected" element={<Collected />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={BevStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
