import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const initInputs = {
  title: "",
  description: "",
  image: "",
  upVotes: 0,
  downVotes: 0,
};

function ProductForm(props) {
  const {addButter} = useContext(UserContext)
  const [inputs, setInputs] = useState(initInputs);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    addButter(inputs);
    setInputs(initInputs);
  }

  const { title, description, image } = inputs;

  return (
    <form className="product--form">
      <div> 
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
        />
        {/* <input
          type="text"
          name="image"
          value={image}
          onChange={handleChange}
          placeholder="Image"
        /> */}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
}
export default ProductForm;
