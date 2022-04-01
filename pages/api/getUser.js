import authenticate from "../../helper/authUser";
import connectDB from "../../helper/connection";
import User from "../../models/user";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

async function getUserById(req, res) {
    const cookie = parse(req.headers.cookie).auth;
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
}

export default connectDB(authenticate(getUserById));
