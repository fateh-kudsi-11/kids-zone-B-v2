import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: import("../../models/User").TUser;
    }
  }
}
