import jwt from "jsonwebtoken";
import UserRepository from "../features/users/user.repository.js";

const userRepository = new UserRepository();

const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  let user;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send("Unauthorized!");
  }
  next();
};

export default jwtAuth;
