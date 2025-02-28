import jwt from "jsonwebtoken";
import { StringValue } from "ms";

const generateToken = (data: object): string => {
  const secret = process.env.TOKEN_SECERT;
  const expiresIn = process.env.TOKEN_EXPIRE || "1h";

  console.log(secret, " ", expiresIn);

  if (!secret) {
    throw new Error("TOKEN_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(data, secret, {
    expiresIn: process.env.TOKEN_EXPIRE as StringValue,
  });

  return token;
};

export { generateToken };
