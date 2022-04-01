import jwt from "jsonwebtoken";
import { parse } from "cookie";

const authenticate = (fn) => async (req, res) => {
  const cookie = parse(req.headers.cookie).auth;
  jwt.verify(
    cookie,
    process.env.jwtsecret,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(401).json({ message: "you are not authenticated" });
    }
  );
};

export default authenticate;
