import { React, useEffect, useState } from "react";
import axios from "axios";
import productData from "../data/productData";
import ButterCard from "./ButterCard";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

function ButterPageSmall(props) {
  const [butterData, setButterData] = useState([]);
  const { userAxios, userState } = useContext(UserContext);
  const cartItems = document.getElementById("cartItems");
  const cartButton = document.getElementById("cartButton");

  function addCart() {
    cartButton.addEventListener("click", () => {
      const productName = { title };
      const price = { price };
      console.log(price)
      const listItem = document.createElement("li");
      listItem.textContent = `${productName} - $${price}`;
      cartItems.appendChild(listItem);
    });
  }

  function getButter() {
    userAxios
      .get("/butter")
      .then((res) => {
        console.log(res.data);
        setButterData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getButter();
  }, []);

  const renderButterCard = butterData.map((item) => (
    <ButterCard image={item.image} title={item.title} price ={`$${item.price}.00`} data={item}/>
  ));

  return (
    <div id="butter--page" className="butter--page">
      {renderButterCard}
    </div>
  );
}
export default ButterPageSmall;
