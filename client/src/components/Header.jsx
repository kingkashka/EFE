import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

function Header() {
  const {userState} = useContext(UserContext)
  const token = userState.token

  function openNav() {
    document.getElementById("mySidebar").style.width = "220px";
    document.getElementById("butter--page").style.marginLeft = "220px";
    document.getElementById("soap--page").style.marginLeft = "220px";
    document.getElementById("profile--page").style.marginLeft = "220px";
  }
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("butter--page").style.marginLeft = "0";
    document.getElementById("soap--page").style.marginLeft = "0";
    document.getElementById("profile--page").style.marginLeft = "0";
  }
  const [toggle, setToggle] = React.useState(true);

  function openCloseNav() {
    setToggle((prevState) => !prevState);
    if (!toggle) {
      closeNav();
    } else {
      openNav();
    }
  }
  return (
    <>
      <div className="header">
        <div className="button--container">
        <button className="openbtn" onClick={openCloseNav}>
          <BsLayoutSidebarInset />
        </button>
        </div>
        <h2>
        Essentially From Earth
        </h2>
        <div className="header--items">
        <li>
          <IoNotifications />
        </li>
        <Link to={token ? "/yourcart" : ""}>
        <li>
            <LuShoppingCart />
        </li>
        </Link>
        <Link to={token ? "/profile" : ""}>
        <li>
          <VscAccount/>
        </li>
        </Link>
        </div>
      </div>
    </>
  );
}
export default Header;
