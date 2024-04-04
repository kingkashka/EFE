import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ShoppingCart from "../components/ShoppingCart";

function CartPage(){
   //  const totalCost = a + b;
     return(
        <>
        <Header/>
        <Sidebar/>
        <ShoppingCart/>
        </>
     )
}
export default CartPage;