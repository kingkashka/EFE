import React, { useContext } from "react";
import { UserContext } from "./context/UserProvider.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import ButterPage from "./pages/ButterPage.jsx";
import SoapPage from "./pages/SoapPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  const { userState, logout } = useContext(UserContext);
  const token = userState.token;
  console.log(token);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ token ? <Navigate to="/" /> : <Auth logout={logout} />} />
        <Route path="/profile" element={<ProtectedRoute token={token} redirectTo={"/login"}>
          <Profile/>
        </ProtectedRoute>} />
        <Route path="/yourcart" element={<CartPage />} />
        <Route path="/butters" element={<ButterPage />} />
        <Route path="/soap" element={<SoapPage />} />
      </Routes>
    </>
  );
}

export default App;
