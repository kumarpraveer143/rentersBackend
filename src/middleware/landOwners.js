import jwt from "jsonwebtoken";
import UserRepository from "../features/users/user.repository.js";

const userRepository = new UserRepository();

const landOwnerAuth = async (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  let user;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    let { id } = payload;
    user = await userRepository.getUserById(id);
    
  } catch (err) {
    return res.status(404).send("Page not Found!");
  }

  if (user.userType !== "landowner") {
    return res.status(401).send("Only landowner can access this route");
  }
  res.cookie("userData", payload);
  next();
};
export default landOwnerAuth;
