import jwt from "jsonwebtoken";

const authenticate = (fn) => async (req, res) => {
  jwt.verify(
    req.cookies.auth,
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
