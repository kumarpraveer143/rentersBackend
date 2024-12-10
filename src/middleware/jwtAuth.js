import jwt from "jsonwebtoken";

function jwtAuth(req, res, next) {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send("Unauthorized!");
  }
  res.cookie("userData", payload);
  next();
}

export default jwtAuth;
