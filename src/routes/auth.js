import express from "express";
import {
  registerUser,
  loginUser,
  getAllUser,
} from "../controller/auth.controller.js";
import signupValidation from "../validations/signup.validation.js";
import loginValidation from "../validations/login.validation.js";

import axios from "axios";

import "dotenv/config";



const router = express.Router();
router.post("/login", loginValidation, loginUser);
router.post("/signup", signupValidation, registerUser);


export default router;
