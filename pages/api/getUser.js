import connectDB from "../../helper/connection";
import User from "../../models/user";
import jwt from "jsonwebtoken";

async function getUserById(req, res) {
  if(req.method !== "GET"){
    return res.status(400).json({message:'req_method_not_supported'})
  }
  if(req.cookies){
    const cookie = req.cookies.auth;
    if (cookie) {
      try {
        const decoded = jwt.verify(cookie, process.env.jwtsecret);
        const response = await User.findById(decoded._id);
        
        if (response) {
          response.password = undefined
          return  res.status(200).json(response);
        } else {
          return res.status(400).json({ message: "User does not exists" });
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).json({ message: "unauthorized" });
    }
  }else{
    res.status(500).json({message:"you are not authenticated"})
  }
  
    
}

export default connectDB(getUserById);
