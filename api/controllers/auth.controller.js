import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";
import jwt from "jsonwebtoken";
// import cookie from 'cookie-parser';
export const signup = async (req, res, next) => {
  const { username, email, number, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    number,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(401, "User not found"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "Invalid password"));
      }
      const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
      // for hidding password like we dont want to give and show password to the use 
      const{password: hashedPassword, ...rest} = validUser._doc;
      const expiryDate = new Date(Date.now() +360000);
      res.cookie('token', token, {
        httpOnly: true,
        expires: expiryDate
      }).status(200).json(rest)
    } catch (error) {
      next(error);
    }
};
