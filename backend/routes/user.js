const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const User = require("../models/user.js");
const {body , validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const JWT_SECRET = "mysecretstring"
const userController = require("../controller/user.js")
const { isLoggedIn } = require("../middleware.js");

//SIGNUP ROUTE
router.post("/signup" ,[
    body("username" ).isLength({min:3}),
    body("email" ).isEmail(),  //check email is valid or not
    body("password").isLength({min:3})
], wrapAsync(userController.signup));


//LOGIN ROUTE
router.post("/login" ,[
  body("password").exists()
], wrapAsync(userController.login));

//get user detalis , login required
router.get("/getuser" ,isLoggedIn , userController.getUser)
module.exports = router;