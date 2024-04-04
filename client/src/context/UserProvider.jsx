import React, { useState } from "react";
import axios from "axios";

const UserContext = React.createContext();
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    reviews: [],
    butter: [],
    cart: [],
    errMsg: ""
  };
  const [userState, setUserState] = useState(initState);


  function addToCart(product){
    console.log(product);
    setUserState(prevState => ({
      ...prevState, cart: [...prevState.cart, product]
    }))
  }

  // SIGNUP
  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token, } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevState) => ({
          ...prevState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }
  
  // LOGIN
  function login(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token, wishlist } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues(res.data.user._id)
        setUserState((prevState) => ({
          ...prevState,
          user,
          token,
          wishlist,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // LOGOUT
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      reviews: []
    })
  }
  // HANDLE ERROR
  function handleAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

// WISHLIST ADDER
function WishlistButter(butterId) {
  userAxios.put(`api/butter/wishlist/${butterId}`)
      .then(res => {
          setButterData(prevButter => prevButter.map(item => itemId !== item._id ? item : res.data))
          setUserState(prevUserState => ({ ...prevUserState, butter: prevUserState.butter.map(item => itemId !== item._id ? item : res.data) }))
      })
      .catch(err => console.log(err))
}

// ADD BUTTER
function addButter(newButter){
  userAxios.post(`/api/butter/user/${userState.user._id}`, newButter)
  .then(res => {
    console.log(res)
    setUserState(prevState => ({
      ...prevState,
      butter: prevState.butter.map(() => [...prevState, res.data])
    }))
    // setUserPost(prevState => [...prevState , res.data])
  })
  .catch(err => console.log(err.response.data.errMsg))
}

function getUserButters(id){
  userAxios.get(`/api/butter/user/${userState.user._id}`)
  .then(res => setUserState(prevState => ({
    ...prevState,
      butter: prevState.butter.map(() => [...prevState, res.data])
  }))) 
  .catch(err => console.log(err.response.data.errMsg))
}

// GET ALL REVIEWS
function getAllReviews(){
  userAxios.get("api/review")
  .then(res => {
    setUserState(prevState => ({
      ...prevState,
      reviews: res.data
    }))
  })
  .catch(err => console.log(err.response.data.errMsg))
}

// ADD REVIEW
function addReview(newReview){
  userAxios.post(`/api/review/`, newReview)
  .then(res => {
    setUserState(prevState => ({
      ...prevState,
      reviews: [...prevState.reviews, res.data]
    }))
  })
  .catch(err => console.log(err.response.data.errMsg))
}

  return (
    <UserContext.Provider
      value={{
        userState,
        signup,
        login,
        logout,
        getAllReviews,
        addButter,
        addReview,
        userAxios,
        getUserButters,
        WishlistButter,
        addToCart     

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };
