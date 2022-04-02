import bcrypt from "bcrypt";
import User from "../../../models/user";
import connectDB from "@/helper/connection";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { v4 as uuidv4 } from "uuid";

async function signup(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  let { name, password, email } = req.body;
  if (name && password && email) {
    email = email.toLowerCase()
    const found_user = await User.findOne({ email: email });

    if (found_user) {
      return res
        .status(401)
        .json({ message: "This email has already been registered" });
    } else {
      try {
        const hash = await bcrypt.hash(password, 12);
        let apikey = uuidv4();
        apikey = apikey.split("-").join("");
        const user = new User({
          name,
          email,
          password: hash,
          api_info: {
            api_key: apikey,
            records: [],
          },
          email_change_count: {
            count: 0,
            changed_date: new Date(),
          },
          pass_change_count: {
            count: 0,
            changed_date: new Date(),
          },
        });
        let usercreated = await user.save();
        const jwt_user = jwt.sign(
          { _id: usercreated._id,email: usercreated.email },
          process.env.jwtsecret,
          { expiresIn: "7d" }
        );
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
        usercreated.password = undefined;
        return res.status(200).json({
          user: usercreated,
          message: "You created account successfully!",
        });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error Occured!" });
      }
    }
  } else {
    return res.status(422).json({ message: "data_incomplete" });
  }
}

export default connectDB(signup);
