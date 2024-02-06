if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors")
const app = express();
const ExpressError = require("./utils/expressError.js")
const mongoose = require("mongoose");

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js");
const User = require("./models/user.js")

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//Cloud database url
const dbUrl = process.env.ATLASDB_URL

main()
    .then(() => {
        console.log("connected to DB successfully")
    }).catch(err => {
        console.log(err)
    })

async function main() {
    await mongoose.connect(dbUrl);
}


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/listings" , listingRouter)
app.use("/listings/:id/reviews" , reviewRouter)
app.use("/user" , userRouter)

app.all("*" , (req,res,next) => {
    next(new ExpressError(404 , "page not found!"))
})

app.use( (err ,req,res,next) => {
    let {statusCode=400 , message="Something went wrong!"} = err;
      res.status(statusCode).send(message)
})

app.listen(5000, () => {
    console.log("server is running on the port 5000")
})