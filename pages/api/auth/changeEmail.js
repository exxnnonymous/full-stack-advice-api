import authenticate from "@/helper/authUser";
import connectDB from "@/helper/connection";
import User from "../../../models/user";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dateDiff from "@/helper/getDateDiff";

export default connectDB(
  authenticate(async function changeEmail(req, res) {
    try {
      if (req.method === "POST") {
        let { newEmail, oldEmail, password } = req.body;

        // checking whether the request body is empty
        if (newEmail && oldEmail && password) {
          oldEmail = oldEmail.toLowerCase()
          newEmail = newEmail.toLowerCase()

          // checking whether the new and old email is same
          if (newEmail === oldEmail) {
            return res.status(400).json({ message: "Enter a new email!" });
          }

          const cookie = parse(req.headers.cookie).auth;
          if (cookie) {
            try {
              const decoded = jwt.verify(cookie, process.env.jwtsecret);
              if (decoded.email !== oldEmail) {
                return res.status(401).json({ message: "Access restricted!" });
              }

              const _user = await User.findOne({ email: oldEmail });
              const found_user = await User.findOne({ email: newEmail });
              if(found_user){
                return res
                  .status(401)
                  .json({ message: "Email has already been taken!" });
              }

              if (!_user) {
                return res
                  .status(401)
                  .json({ message: "Invalid email or password!" });
              } else {
                const match = await bcrypt.compare(password, _user.password);
                if (!match) {
                  return res
                    .status(400)
                    .json({ message: "Invalid email or password!" });
                }
                if (_user.email_change_count.count === 0) {
                  await User.updateOne(
                    { email: { $eq: oldEmail } },
                    {
                      $set: { email: newEmail, changed_date: new Date() },
                      $inc: { "email_change_count.count": 1 },
                    }
                  );

                  return res
                    .status(200)
                    .json({ message: "successfully changed the email" });
                } else {
                  
                  const dateDifference = dateDiff(
                    new Date(_user.email_change_count.changed_date),
                    new Date()
                  );

                  if (dateDifference >= 30) {
                    await User.updateOne(
                      { email: { $eq: oldEmail } },
                      {
                        $set: { email: newEmail, changed_date: new Date() },
                        $inc: { "email_change_count.count": 1 },
                      }
                    );

                    return res
                      .status(200)
                      .json({ message: "successfully changed the email" });
                  } else {
                    return res.status(400).json({
                      message: "You can change your email once a month!",
                    });
                  }
                }
              }
            } catch (err) {
              return res.status(500).json(err);
            }
          } else {
            return res.status(400).json({ message: "unauthorized" });
          }
        } else {
          return res.status(400).json({ message: "data_incomplete" });
        }
      } else {
        return res.status(422).json({ message: "req_method_not_supported" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error Occured!" });
    }
  })
);
