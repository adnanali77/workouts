import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";

const createToken = (_id) => {
  return Jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
export const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
    // res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
