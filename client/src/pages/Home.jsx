import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HomePageSmall from "../components/HomePageSmall";

function Home() {

  return (
    <>
      <Header />
      <Sidebar />
      <HomePageSmall /> 
     
    </>
  );
}
export default Home;
