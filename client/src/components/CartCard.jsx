import React from "react";

function CartCard(props) {
    const {title, image, price,} = props
    
  return (
    <>
      <div className="cart--card">
        <h2>{title}</h2>
        <img>{image}</img>
        <h3>${price}</h3>
      </div>
    </>
  );
}
export default CartCard;
