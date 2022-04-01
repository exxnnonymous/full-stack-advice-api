import connectDB from "../../../helper/connection";
import User from "../../../models/user";
import { v4 as uuidv4 } from "uuid";
import authenticate from "helper/authUser";

export default connectDB(authenticate(async function changeApiKey(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if ( email) {
      let _user = await User.findOne({ email: email });
      if (!_user) {
        return  res.status(401).json({ message: "Invalid email!" });
      } else {
        let apikey = uuidv4();
        apikey = apikey.split("-").join("");
        await User.updateOne({email:email},{$set:{'api_info.api_key':apikey}})
        return  res.status(200).json({message:"Successfully changed the API key"})
      }
    } else {
      return  res.status(422).json({ message: "data_incomplete" });
    }
  } else {
    return  res.status(422).json({ message: "req_method_not_supported" });
  }
}));
