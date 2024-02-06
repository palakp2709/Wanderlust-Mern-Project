const jwt = require("jsonwebtoken")
const JwtSecret = process.env.JWT_SECRET


module.exports.isLoggedIn =  (req,res,next) => {
        //get the user from jwt token and add id to the req object;
        const token = req.header("auth-token");
        if(!token){
            return res.status(401).send("Access Denied")
        }
            const jwtVerify = jwt.verify(token , JwtSecret);
            req.user = jwtVerify.user ; //token contain user id as well
            next();       

}