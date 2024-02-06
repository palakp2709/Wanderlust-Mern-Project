
const User = require("../models/user.js");
const { validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JwtSecret = process.env.JWT_SECRET

module.exports.signup = async(req,res) => {
    //if there a re error return bad request
      let success = false;
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          res.status(400).json({errors : errors.array()})
      }
  
      //check whether the user with this email is already exist
       let user = await User.findOne({email : req.body.email});
       if(user){
        return res.status(400).json({success,error : "Username with this email already exist!"})
       }
       
       let salt = await  bcrypt.genSalt(10)   //return promise that is why await keyword is used
       const securedPassword = await bcrypt.hash(req.body.password , salt) ////return promise thst is why await keyword is used
       user = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : securedPassword,
      })
      
      //signing the jwt token -- it taes (payload, secret) as callback
      const data = {
        user : {
          id : user.id
        }
      }
      const authToken = jwt.sign(data , JwtSecret);
      success = true
      res.json({success , authToken})   
  };

  module.exports.login = async(req,res) => {
    let success = false;
     //if there a re error return bad request
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         res.status(400).json({errors : errors.array()})
     };
  
     let {username , password} = req.body;
     try {
             let user = await User.findOne({username});
             if(!user){
              return res.status(400).json({ success , error : "Please try to login with a correct credentials"});
             }
  
             const comparePassword = await bcrypt.compare( password , user.password);
             if(!comparePassword){
              return res.status(400).json({success , error : "Password is incorrect"});
             }
  
             const data = {
              user : {
                id : user.id
              }
            }
            const authToken = jwt.sign(data , JwtSecret);
            success = true
            res.json({ success , authToken })
     } catch (error) {
         res.send(error.messsage)
     }
  };

  module.exports.getUser = async(req,res)=> {
    const userID = req.user.id
    const user = await User.findById(userID).select("-password") //fetch all info except password;
    res.send(user)    
};

