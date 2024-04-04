const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue.js");

// GET ALL ISSUES
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(issues);
  });
});

// GET SPECIFIC ISSUE
issueRouter.get("/:issueId", async (req, res, next) => {
  try {
    const issueId = req.params.issueId;
    const foundIssue = await Issue.findById(issueId);
    if (!foundIssue) {
      return res.status(404).send("Issue not found");
    }
    return res.status(200).send(foundIssue);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// GET SPECIFIC ISSUES BASED ON USERID
issueRouter.get("/user/:userId", (req, res, next) => {
  
  Issue.find({ userId: req.auth._id }, (err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!issues) {
      console.log(issues);
      res
        .status(404)
        .send({ message: `No issues found for the provided user` });
    }
    res.status(200).send(issues);
  });
});
// ADD NEW ISSUE
issueRouter.post("/", (req, res, next) => {
  req.body.userId = req.auth._id
  Issue.findOne({ title: req.body.title }, (err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (issue) {
      console.log(req.body);
      res.status(403);
      return next(new Error("The issue's associated title is already taken"));
    }
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedIssue); // Send the saved issue
    });
  });
});

// DELETE AN ISSUE
issueRouter.delete("/:id", (req, res, next) => {
  Issue.findByIdAndDelete(req.params.id, (err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!issue) {
      return res.status(404).send(`Issue not found`);
    }
    res.status(200).send(`Issue successfully deleted`);
  });
});

// UPVOTE AN ISSUE
issueRouter.put("/upVote/:issueId", (req, res, next) => {
  console.log(req.auth);
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    {
      $addToSet: { likedUsers: req.auth._id },
      $pull: { dislikedUsers: req.auth._id },
    },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedIssue);
    }
  );
});

// DOWNVOTE AN ISSUE
issueRouter.put("/downVote/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    {
      $addToSet: { dislikedUsers: req.auth.__id },
      $pull: { likedUsers: req.auth._id },
    },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedIssue);
    }
  );
});

module.exports = issueRouter;
