import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import IssueForm from "../components/IssueForm.js";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import ProfilePageSmall from "../components/ProfilePageSmall.jsx";
import { UserContext } from "../context/UserProvider.jsx";

function Profile() {
  const {
    // user: {user},
    userState,
    comments,
    userAxios,
    
  } = useContext(UserContext);


  const [issueData, setIssueData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [userPost, setUserPost] = useState([])


  function getReviews() {
    userAxios
      .get("/api/review")
      .then((res) => {
        console.log(res.data);
        setReviewData(res.data);
      })
      .catch((err) => console.log(err));
  }

  // function getUserIssues() {
  //   userAxios
  //     .get(`/api/issues/user/${userState.user._id}`)
  //     .then((res) => {
  //       console.log(res);
  //       setUserPost(prevState => [...prevState, res.data]);
  //     })
  //     .catch((err) => console.log(err.response.data.errMsg));
  // }

  // useEffect(() => {
  //   getUserIssues();
  //   getComments();
  // }, []);

  // const filteredComments = comments.filter((comment) => comment.issue === _id);
  // const renderComments = commentData.map((comment) => <h3>{comment.text}</h3>);
  // const renderIssues = userPost.map((issue) => (
  //   <IssueCard
  //     title={issue.title}
  //     description={issue.description}
  //     image={issue.image}
  //   />
  // ));
  // <IssueForm addIssue={addIssue} />

  return (
    <>
      <Header />
      <Sidebar />
      <ProfilePageSmall />
      {/* {renderIssues} */}
      {/* <h3>Your Comments</h3> */}
      {/* {renderComments} */}
    </>
  );
}

export default Profile;
