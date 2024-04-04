import React from "react";
import { FaHeart } from "react-icons/fa";

function SoapCard(props) {
  const { title, image, price } = props;
  
  function addCart(){
    const cartButton = document.getElementById("cartButton")
    cartButton.addEventListener("click", () => {

    })
  }
  function addWishlist(){
    const wishlistHeart = document.getElementById("wishlist--heart")
    wishlistHeart.addEventListener("click", () => {
      wishlistHeart.style.color = "red"
    })
  }
  return (
    <div className="soapCard--container">
      <div className="soap--card">
        <img src={image}/>
        <div className="soap--title">
        <h3>{price} USD</h3>
        <h3>{title}</h3>
        </div>
        <div className="button--container">
        <FaHeart onClick={addWishlist} id="wishlist--heart" className="wishlist--heart"/> 
          <div className="button--container2">
        <button id="cartButton">Add to Cart</button>
        <button id="buyButton">Buy Now</button>   
          </div>
        </div>
     </div>
    </div>
  );
}
export default SoapCard;
