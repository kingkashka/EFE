import CartCard from "./CartCard";
import productData from "../data/productData";
import ButterCard from "./ButterCard";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import ProfilePageSmall from "./ProfilePageSmall";


function ShoppingCart(){
    const {userState} = useContext(UserContext)
    console.log(userState);

    const displayCart = userState.cart.map(item => <ButterCard title={item.title} price={item.price} image={item.image} data={item}/>)

    
    return(
        <>
        <div className="shoppingcart--Card">
            <div className="cart--container2">
                <h2>Shopping Cart</h2>
                {displayCart}

            </div>
        <div className="buy--container">
            <button>Check Out</button>
        </div>
        </div>
        </>
    )
}
export default ShoppingCart;