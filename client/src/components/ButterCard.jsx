import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../context/UserProvider";
import Profile from "../pages/Profile";

function ButterCard(props) {
  const { title, image, price, butterData, data } = props;
  const { userAxios, wishlistButter, userState, addToCart } = useContext(UserContext);
  const { count, setCount } = useState("0");

  

  function addWishlist() {
    const wishlistHeart = document.getElementById("wishlist--heart");
    wishlistHeart.addEventListener("click", () => {
      wishlistHeart.style.color = "red";
    });
  }
  return (
    <div className="butterCard--container">
      <div id="butter--card" className="butter--card">
        <img src={image} />
        {/* <div className="title--price"> */}
        <h3 className="price">{price} USD</h3>
        <h3 id="butter--title" className="butter--title">{title}</h3>
        {/* </div> */}
        <div className="button--container">
          <FaHeart
            onClick={addWishlist}
            id="wishlist--heart"
            className="wishlist--heart"
          />
          <div className="button--container2">
            <button id="cartButton" onClick={() => addToCart(data)}>
              Add to Cart
            </button>
            <button id="buyButton">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ButterCard;
