const express = require("express");
const wishlistRouter = express.Router();
const Wishlist = require("../models/wishlist.js")

// GET ALL WISHLIST
wishlistRouter.get("/", (req, res, next) => {
    Wishlist.find((err, items) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(items);
  });
});

// GET SPECIFIC WISHLIST
wishlistRouter.get("/:wishlistId", async (req, res, next) => {
  try {
    const wishlistId = req.params.butterId;
    const foundButter = await Issue.findById(butterId);
    if (!foundButter) {
      return res.status(404).send("Butter not found");
    }
    return res.status(200).send(foundButter);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// ADD NEW WISHLIST
wishlistRouter.post("/", (req, res, next) => {
  req.body.userId = req.auth._id;
  Wishlist.findOne({ title: req.body.title }, (err, items) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (items) {
      console.log(req.body);
      res.status(403);
      return next(new Error("The item associated title is already added to Wishlist"));
    }
    const newWishlist = new Wishlist(req.body);
    newWishlist.save((err, savedWishlist) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedWishlist); // Send the saved issue
    });
  });
});

// DELETE A WISHLIST
wishlistRouter.delete("/:id", (req, res, next) => {
  Wishlist.findByIdAndDelete(req.params.id, (err, items) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!items) {
      return res.status(404).send(`Issue not found`);
    }
    res.status(200).send(`Issue successfully deleted`);
  });
});

module.exports = wishlistRouter;
