import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import ProductForm from "./ProductForm";
import ReviewForm from "./ReviewForm";

function ProfilePageSmall(){
    const {userState, addButter, getUserButters, getAllReviews, addReview} = useContext(UserContext)
    const userName = userState.user.username
    console.log(userState);
    
    useEffect(() => {
      getUserButters()
      getAllReviews()  
    },[])
    console.log(userState.reviews);
    
    const renderSuggestions = userState.butter.map(item => <ButterCard item={item.title}/>)
    const renderReviews = userState.reviews.map(item => <h3>{item.text}</h3>)
    return(
        <div id="profile--page" className="profile--page">
        <h1>Welcome back, {userName}... You have been missed</h1>
        {/* <h2>Any Recommendations?</h2> */}
        {/* <p>Please submit your ideas here to be considered</p> */}
        {/* <ProductForm addButter={addButter}/> */}
        {/* <h3>Your submissions</h3> */}
        {renderSuggestions}
        <h1>Leave a Review</h1>
        <ReviewForm addReview={addReview}/>
        {renderReviews}


        </div>
    )
}
export default ProfilePageSmall;