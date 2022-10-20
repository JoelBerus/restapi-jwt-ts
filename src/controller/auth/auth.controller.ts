import { Request, Response } from "express";
import User, { IUser } from "../../models/auth/index";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser: IUser = new User({ username, email, password });
    newUser.password = await newUser.encryptPassword(newUser.password);
    const savedUser = await newUser.save();
    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET || "tokentest"
    );
    res.header("auth-token", token).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user == null)
    return res.status(400).json({ message: "Email is not found" });

  const validPassword: boolean = await user.validatePassword(password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "tokentest",
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  res.header("auth-token", token).json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (user == null) return res.status(400).json({ message: "User not found" });
  res.json(user);
};
