const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type : String,
    required : true
  } ,
  image: {
    url : String, 
    // default:
    //   "https://images.unsplash.com/photo-1682685797742-42c9987a2c34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    //  set: (v) =>
    //   v === ""
    //     ?  "https://images.unsplash.com/photo-1682685797742-42c9987a2c34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
    //     : v,
  },
  price: {
    type : Number,
    required : true
  },
  location: {
    type:String,
    required : true
  },
  country: {
    type :String,
    required : true
  },
  reviews : [
    {
    type : Schema.Types.ObjectId,
    ref : "Review"
  }
],
 owner : {
    type : Schema.Types.ObjectId,
     ref:"User"
 }

}
);


listingSchema.post("findOneAndDelete" ,  async (listing) => {
    if(listing) {
      await Review.deleteMany({_id : { $in : listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;