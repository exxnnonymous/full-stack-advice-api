import bcrypt from "bcrypt";
import User from "../../../models/user";
import connectDB from "@/helper/connection";
import jwt from "jsonwebtoken";
import cookie from "cookie";

async function signup(req, res) {
  if (req.method === "POST") {
    let { password, email } = req.body;
    if (password && email) {
      email = email.toLowerCase()
      let _user = await User.findOne({ email: email });
      if (!_user) {
        return res.status(401).json({ message: "Invalid email or password!" });
      } else {
        const match = await bcrypt.compare(password, _user.password);
        if (match) {
          try {
            const user_data = { email: _user.email, _id: _user._id };
            const jwt_user = jwt.sign(user_data, process.env.jwtsecret, {
              expiresIn: "7d",
            });
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", jwt_user, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 3600000 * 24 * 7,
                path: "/",
              })
            );

            _user.password = undefined;

            return res
              .status(200)
              .json({ user: _user, message: "You logged in successfully!" });
          } catch (err) {
            return res
              .status(500)
              .json({ message: "Internal Server Error Occured!" });
          }
        } else {
          return res
            .status(401)
            .json({ message: "Invalid email or password!" });
        }
      }
    } else {
      return res.status(422).json({ message: "data_incomplete" });
    }
  } else {
    return res.status(422).json({ message: "req_method_not_supported" });
  }
}

export default connectDB(signup);
