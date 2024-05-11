
import {BcryptUtil} from "../utils/bcrypt.js"
import Users from  '../models/signup.js'

const register = async (data) => {
  const {
    username, email, password,
  } = data;
  const user = await Users.create({
    username,
    email,
    password: await BcryptUtil.hash(password),
   
  });
};

const findUserByEmail = async (email) => {
  const UserInfo = await Users.findOne({email});

  if (UserInfo == null) {
    return false;
  }
  return UserInfo;
};

const findUserById = async (id) => {
  const UserInfo = await Users.findOne({id});

  if (UserInfo == null) {
    return false;
  }
  return UserInfo;
};

export {
  register, findUserByEmail, findUserById, 
};
