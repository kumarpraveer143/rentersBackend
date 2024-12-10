import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(404).send("Only accessed to admin!");
  }

  // console.log(payload.user.userType);
  if (payload.user.userType !== "admin") {
    return res.status(404).send("Only accessed to admin!");
  }
  res.cookie("userData", payload);
  next();
}

export default adminAuth;
