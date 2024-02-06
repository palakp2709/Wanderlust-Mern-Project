const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email: {
        type : String,
        required : true,
        unique : true
        
    },  
    password : {
        type : String,
        required : true
    },
 
})

//add username ,password feild ,and even genarate hash and salt of the password

module.exports = mongoose.model("User" , userSchema) ;