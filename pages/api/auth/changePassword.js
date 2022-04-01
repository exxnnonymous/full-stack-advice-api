import connectDB from "../../../helper/connection";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import dateDiff from "@/helper/getDateDiff";

export default connectDB(async function changePassword(req, res) {
  if (req.method === "POST") {
    const { oldPassword, newPassword, email } = req.body;
    if (oldPassword && newPassword && email) {
      if (oldPassword === newPassword) {
        return res.status(400).json({ message: "Please choose new password!" });
      }

      let _user = await User.findOne({ email: email });
      if (!_user) {
        return res.status(401).json({ message: "Invalid Email!" });
      } else {
        try {
          const match = await bcrypt.compare(oldPassword, _user.password);
          if (match) {
            const hash = await bcrypt.hash(newPassword, 12);
            if (_user.pass_change_count.count === 0) {
              await User.updateOne(
                { email: { $eq: email } },
                {
                  $set: { password: hash, changed_date: new Date() },
                  $inc: { "pass_change_count.count": 1 },
                }
              );
              return res
                .status(200)
                .json({ message: "Successfully changed the password" });
            } else {
              const dateDifference = dateDiff(
                new Date(_user.pass_change_count.changed_date),
                new Date()
              );

              if (dateDifference >= 7) {
                await User.updateOne(
                  { email: { $eq: email } },
                  {
                    $set: { password: hash, changed_date: new Date() },
                    $inc: { "pass_change_count.count": 1 },
                  }
                );
                return res
                  .status(200)
                  .json({ message: "Successfully changed the password" });
              } else {
                return res.status(400).json({
                  message: "You can change your password once a week!",
                });
              }
            }
          } else {
            return res.status(401).json({ message: "Incorrect password!" });
          }
        } catch (err) {
          return res
            .status(500)
            .json({ message: "Internal Server Error Occured" });
        }
      }
    } else {
      return res.status(422).json({ message: "data_incomplete" });
    }
  } else {
    return res.status(422).json({ message: "req_method_not_supported" });
  }
});
