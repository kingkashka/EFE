function ContactForm(props){
    const {
        handleChange,
        handleSubmit,
        btnText,
        inputs: { username, password },
        errMsg
      } = props;
    return(
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={personName}
        name="name"
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email" 
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel" 
        value={telephone}
        name="tel"
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="text" 
        value={comment}
        name="comment"
        onChange={handleChange}
        placeholder="Comment"
      />
      <button>{btnText}</button>
    </form>
    )
}
export default ContactForm