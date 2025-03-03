import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import jwt from "jsonwebtoken";
import userControllers from "../controllers/user.controllers";

interface TokenPayload {
  id: string;
}

const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;

      const decodeData = jwt.verify(
        token,
        process.env.TOKEN_SECERT as string
      ) as TokenPayload;


      const user =await  userControllers.verifyUser(decodeData.id);
      req.user = user

        next()
    } catch (error) {
      throw new ApiError("Invalid access token", 401);
    }
  }
);

export default auth;
