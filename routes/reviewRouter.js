const express = require('express')
const reviewRouter = express.Router()
const Review = require('../models/review.js')

// Get all REVIEW
reviewRouter.get('/', (req, res, next) => {
    Review.find((err, reviews) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(reviews)      
    })
})
// Get REVIEW by user
reviewRouter.get("/:userId", (req, res, next) => {
    Review.find({user: req.auth._id}, (err, reviews) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(reviews)
    })
})

// Add REVIEW 
reviewRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newReview = new Review(req.body)
    newReview.save((err, savedreview) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(201).send(savedreview)
    }) 
})

// Get REVIEW associated with Issue
reviewRouter.get("/:reviewId", (req, res, next) => {
    Review.find((err, review) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(review)
    })
})

// Delete REVIEW
reviewRouter.delete("/:reviewId", (req, res, next) => {
    Review.findOneAndDelete(
        {_id: req.params.reviewId, user: req.auth._id},
        (err, deletedReview) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(`review has been deleted ${deletedReview}`)
        }
    )
})

// Update REVIEW
reviewRouter.put("/:reviewId", (req, res, next) => {
    Review.findOneAndUpdate(
        { _id: req.params.reviewId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedReview) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(201).send(updatedReview)
        }
    )
})

module.exports = reviewRouter