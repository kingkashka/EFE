import React, { useState, useContext } from "react";
import AuthForm from "../components/AuthForm.jsx"; // Make sure to import AuthForm if it's not imported already
import { UserContext } from "../context/UserProvider.jsx";
import { ImGoogle } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";

const initInputs = { username: "", password: "" };

function Auth(props) {
  const { logout } = props;
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(true); // Use useState instead of React.useState

  const { signup, login, errMsg } = useContext(UserContext); // Add login function from UserContext

  function changeView() {
    setToggle((prevState) => !prevState);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault(); // Prevent default form submission
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
    login(inputs);
  }

  return (
    <>
      <div className="auth--page">
        <div className="login--container">
          <h1>Essentially From Earth</h1>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
          {toggle ? 
            <button onClick={handleSignup}>Signup</button>
           : 
            <button onClick={handleLogin}>Login</button>
          }
          {/* <p>{errMsg}</p> */}
        <h2 className="member" onClick={changeView}>
          {toggle
            ? "Already a member? Login here"
            : "Not a member? Sign up here"}
        </h2>
        <h3 onClick={logout}>Logout</h3>
        <div className="link--container">
        <ImGoogle className="social--links" />
        <FaSquareFacebook className="social--links" />
        </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
