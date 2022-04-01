import cookie from "cookie";

function logout(req, res) {
  if (req.method === "POST") {
     res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", "no", {
        maxAge: 0,
        path: "/",
      })
    );
    return  res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } else {
    return  res.status(422).json({ message: "req_method_not_supported" });
  }
}

export default logout;
