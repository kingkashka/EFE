import React from "react";

function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    inputs: { username, password },
    errMsg
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password" 
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button>{btnText}</button>
      <p>{errMsg}</p>
    </form>
  );
}

export default AuthForm;
