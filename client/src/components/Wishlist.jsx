import React from "react";

function Wishlist() {
// const { downVoteIssue, upVoteIssue } = props;
  const { userAxios } = useContext(UserContext);
  const [issueData, setIssueData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  function getIssues() {
    userAxios
      .get("/api/issues")
      .then((res) => {
        setIssueData(res.data);
      })
      .catch((err) => console.log(err));
  }

//   function deleteWishlist(){
//     userAxios.
//   }

  const issueNum = issueData.map(issue => issue._id);
console.log(issueNum);

  // const issueNum = issueData.map((num) => num._id);

  function getComments() {
    userAxios
      .get("/api/comment")
      .then((res) => {
        // console.log(res.data)
        setCommentData(res.data);
      })
      .catch((err) => console.log(err));
    }
    // const renderComments = commentData.filter((comment) => {
    //   return comment.issue === issueNum;
    // });
    const renderComments = commentData.filter(comment => issueNum.includes(comment.issue));


    const commentElements = renderComments.map(comment => (
      <div key={comment._id}>
        <p>{comment.text}</p>
        {/* Render other properties of the comment as needed */}
      </div>
    ));
    

    // console.log(renderComments);
    
    useEffect(() => {
      // Fetch issue data when component mounts
      getComments();
      getIssues();
    }, []);

  const issue =
    issueData.length > 0 &&
    issueData.map((issue) => (
      <div key={issue._id} className="video-card">
        <div className="thumbnail">
          <img src={issue.thumbnailUrl} alt="Issue Thumbnail" />
        </div>
        <div className="video-info">
          <h2 className="video-title">{issue.title}</h2>
          <p className="video-description">{issue.description}</p>
          <div>
            {/* Add upvote and downvote buttons/icons */}
            <button onClick={() => upVoteIssue(issue._id)}>
              <FaHeart />
            </button>
            <button onClick={() => downVoteIssue(issue._id)}>
              <GiBrokenHeart />
            </button>
            {/* Display vote count */}
            <span>{issue.votes}</span>
          </div>
          <CommentForm issueId={issue._id} />
          <h3 className="comment">{commentElements}</h3>

          {/* <h3 className="comment">{renderComments}</h3> */}
        </div>
      </div>
    ));
  return(
    <>
    </>
  );
}
export default Wishlist;
