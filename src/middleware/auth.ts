import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrRes";
import asyncHandler from "./async";
import User from "../models/User";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});

// @ts-ignore
