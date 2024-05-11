import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Users from "../models/signup.js";
import { findUserByEmail, register } from "../services/user.service.js";

const registerUser = async (req, res) => {
  try {
    const { email, password, username} = req.body;

    const userData = {
      username,
      email,
      password,
  
    };
    const EmailExist = await findUserByEmail(email);

    if (EmailExist) {
      return res.status(400).json({ message: "email already exists" });
    }
    const token = generateToken(userData, { expiresIn: "10m" });
    const response = await register(userData);
    return res.status(201).json({
      message: "registeration successfull",
      user: response,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: "Server error" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      await res.status(404).send({ message: "Invalid credentials !" });
    }
    const UserToken = {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      expired: user.expired,
    };
    const token = generateToken(UserToken);
    return res.status(200).json({ user: user, token: token });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const user = await Users.find();
     return  res.status(200).send({user})
  } catch (error) {
    next(error);
  }
};
export { registerUser, loginUser, getAllUser };
