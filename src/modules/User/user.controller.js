// add user api

import { Op } from "sequelize";
import User from "../../../DB/models/user.model.js";
import { hashSync, compareSync } from "bcrypt";

export const signUp = async (req, res) => {
  try {
    // body , name , email , password , gender
    const { name, email, password, gender } = req.body;

    // check email is already exist or not
    const isEmailExist = await User.findOne({ where: { email } }); // {} ,null
    if (isEmailExist) {
      return res.json({ message: "Email is already exist" });
    }
    // hash password
    const cipher = hashSync(password, 10);
    console.log(cipher);
    // insert data into table
    const user = await User.create({
      name,
      email,
      password: cipher,
      gender,
    });

    res.json({ message: "User Created", user });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    // body , email , password
    const { email, password } = req.body;
    const isUserExists = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExists) {
      return res.json({ message: "Invalid Credentials" });
    }

    // match password
    const isPasswordMatch = compareSync(password, isUserExists.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Success", username: isUserExists.name });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};
