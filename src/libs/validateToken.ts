import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const tokenValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "tokentest"
    ) as IPayload;
    req.userId = payload._id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  next();
};
