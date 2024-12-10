import jwt from "jsonwebtoken";

const landOwnerAuth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(404).send("Page not Found!");
  }
  // console.log(payload.user.userType);
  if (payload.user.userType !== "landowner") {
    return res.status(401).send("Only landowner can access this route");
  }
  res.cookie("userData", payload);
  next();
};
export default landOwnerAuth;
