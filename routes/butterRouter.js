const express = require("express");
const butterRouter = express.Router();
const Butter = require("../models/butters.js");

// GET ALL BUTTERS
butterRouter.get("/", (req, res, next) => {
  Butter.find((err, butters) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(butters);
  });
});

// GET SPECIFIC BUTTERS
butterRouter.get("/:butterId", async (req, res, next) => {
  try {
    const butterId = req.params.butterId;
    const foundButter = await Butter.findById(butterId);
    if (!foundButter) {
      return res.status(404).send("Butter not found");
    }
    return res.status(200).send(foundButter);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// GET PRODUCT BY USER
// butterRouter.get("/user", async (req, res, next) => {
//   try {
//     const butterId = req.auth.butterId;
//     const foundButter = await Butter.findById(butterId);
//     if (!foundButter) {
//       return res.status(404).send("Butter not found");
//     }
//     return res.status(200).send(foundButter);
//   } catch (err) {
//     res.status(500);
//     return next(err);
//   }
// });

butterRouter.get("/user/:Id", async (req, res, next) => {
  Butter.find({user: req.params.Id}, (err, butters) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(butters)
  })
});

// req.body.userId = req.auth._id;
// ADD NEW BUTTERS
butterRouter.post("/", (req, res, next) => {
  Butter.findOne({ title: req.body.title }, (err, butter) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (butter) {
      console.log(req.body);
      res.status(403);
      return next(new Error("The Butter's associated title is already taken"));
    }
    const newButter = new Butter(req.body);
    newButter.save((err, savedButter) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedButter); // Send the saved issue
    });
  });
});

// ADD TO WISHLIST
// butterRouter.put('/:butterId', (req, res, next) => {
//   Butter.findOneAndUpdate(
//       { _id: req.params.butterId },
//       {
//           $addToSet: { likedUsers: req.auth._id },
//           $pull: { dislikedUsers: req.auth._id }
//       },
//       { new: true },
//       (err, updatedButter) => {
//           if (err) {
//               res.status(500)
//               return next(err)
//           }
//           return res.status(201).send(updatedButter)
//       }
//   )
// })

butterRouter.put("/:butterId", async (req, res, next) => {
  try {
      const updatedButter = await Butter.findOneAndUpdate(
          { _id: req.params.butterId },
          req.body, // Update object with this data
          { new: true } // Options object with both 'new' and '$inc'
      );

      if (!updatedButter) {
          return res.status(404).send("Butter not found");
      }

      return res.status(201).json(updatedButter);
  } catch (err) {
      console.error(err);
      res.status(500)
      return next(err)
  }
});

// DELETE A BUTTER
butterRouter.delete("/:id", (req, res, next) => {
  Butter.findByIdAndDelete(
    {_id: req.params.butterId, user: req.user._id },
    (err, deletedButter) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!deletedButter) {
      return res.status(404).send(`Issue not found`);
    }
    res.status(200).send(`Issue successfully deleted`);
  });
});

module.exports = butterRouter;
