import jwt from "jsonwebtoken";

const generateToken = async (data: string) => {
  const token = await jwt.sign(data, process.env.TOKEN_SECERT as string, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRE as string, 10),
  });

  return token;
};

export { generateToken };
