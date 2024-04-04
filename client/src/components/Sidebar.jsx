import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { RiHome2Fill } from "react-icons/ri";
import { GiSoap } from "react-icons/gi";
import { GiButterToast } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoBody } from "react-icons/io5";


function Sidebar() {
  const { logout, userState: {token} } = useContext(UserContext);
  const navigate = useNavigate()
  function handleClick(){
    token ? logout() : navigate("/login")
  }
  return (
    <>
      <div id="mySidebar" className="sidebar">
        <div className="sidebar1">
          <li>
            <Link className="link" to={"/"}>
              <RiHome2Fill /> Home
            </Link>
          </li>
          <li>
            <Link className="link" to={"/profile"}>
              <IoBody /> Profile
            </Link>
          </li>
          <li>
          <Link className="link" to={"/soap"}>
          <GiSoap /> Soap
          </Link>
          </li>
          <Link className="link" to={"/butters"}>
          <li>
          <GiButterToast /> Butters
          </li>
          </Link>
        </div>
        <li onClick={handleClick}>
          <RiLogoutBoxLine /> {token ? "Logout" : "Login"}
        </li>
      </div>
    </>
  );
}
export default Sidebar;
