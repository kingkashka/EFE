import { useContext } from "react";
import { React, useState } from "react";
import { UserContext } from "../context/UserProvider";

const initInputs = {
  text: "",
};

function ReviewForm(props) {
  const [inputs, setInputs] = useState(initInputs);
  const { addReview } = props;
  // const {addReview} = useContext(UserContext)

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    addReview(inputs);
    setInputs(initInputs);
  }
  const { description } = inputs;

  return (
    <form>
      <div>
      <textarea
        className="text"
        type="text"
        name="text"
        value={description}
        onChange={handleChange}
        placeholder="Leave a Review..."
      />
      </div>
      <button className='review--button' onClick={handleSubmit}>Comment</button>
    </form>
  );
}
export default ReviewForm;
