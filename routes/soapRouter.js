const express = require("express");
const soapRouter = express.Router();
const Soap = require("../models/soap.js");

// GET ALL SOAP
soapRouter.get("/", (req, res, next) => {
  Soap.find((err, soaps) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(soaps);
  });
});

// GET SPECIFIC SOAP
soapRouter.get("/:soapId", async (req, res, next) => {
  try {
    const soapId = req.params.soapId;
    const foundSoap = await Issue.findById(soapId);
    if (!foundSoap) {
      return res.status(404).send("Soap not found");
    }
    return res.status(200).send(foundSoap);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// ADD NEW SOAP
soapRouter.post("/", (req, res, next) => {
  // req.body.userId = req.auth._id;
  Soap.findOne({ title: req.body.title }, (err, soap) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (soap) {
      console.log(req.body);
      res.status(403);
      return next(new Error("The Soap's associated title is already taken"));
    }
    const newSoap = new Soap(req.body);
    newSoap.save((err, savedSoap) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedSoap); // Send the saved issue
    });
  });
});

// DELETE A SOAP
soapRouter.delete("/:id", (req, res, next) => {
  Soap.findByIdAndDelete(req.params.id, (err, soaps) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!soaps) {
      return res.status(404).send(`Issue not found`);
    }
    res.status(200).send(`Issue successfully deleted`);
  });
});

module.exports = soapRouter;
