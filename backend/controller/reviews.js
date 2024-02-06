const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js")

module.exports.createReview = async (req,res) => {
    let {id} = req.params ;
    const {comment , rating , createdAt} = req.body ;
    let listing = await Listing.findById(id);

    let newReview =  new Review({comment , rating , createdAt});
    newReview.author = req.user.id   //associate a user to the review
    console.log(newReview.author)
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.send(listing)
};

module.exports.destroyReview = async (req,res) => {
    let { id , reviewId} = req.params;

    await Listing.findByIdAndUpdate({ _id: id } , { $pull : {reviews : reviewId}} , {new:true})
    await Review.findByIdAndDelete(reviewId)
    // console.log(id) ;
    res.json({"success ": "deleted successfully" })
}