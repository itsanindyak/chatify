import { PrismaClient } from "@prisma/client";
import prismaClient from "../service/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponce } from "../utils/apiResponce";

class User {
  private prisma: PrismaClient;
  constructor(Prisma: PrismaClient = prismaClient) {
    this.prisma = Prisma;
  }

  // sign up user

  signUp = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new ApiError(
        existingUser.email === email
          ? "Email already taken "
          : "Username already taken",
        409
      );
    }

    this.prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return res.json(
        new ApiResponce(201, newUser, "User registred successfully")
      );
    });
  });

  // login user

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      throw new ApiError("Invalid email", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new ApiError("Invalid password", 401);
    }

    const token = generateToken({ id: existingUser.id });

    const options = {
      httpOnly: true,
      secure: true,
    };

    const user = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      status: existingUser.status,
    };

    return res
      .cookie("token", token, options)
      .json(new ApiResponce(200, user, "Login Succesfully"));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .clearCookie("token", options)
      .json(
        new ApiResponce(
          201,
          { message: "Logout Succesfully" },
          "Logout Succesfully"
        )
      );
  });

  verifyUser = async (id: string) => {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
      },
    });

    if (!existingUser) {
      throw new ApiError("Unauthorized Access", 401);
    }

    return existingUser;
  };
}

export default new User();
