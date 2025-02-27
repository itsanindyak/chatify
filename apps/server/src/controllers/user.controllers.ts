import { PrismaClient } from "@prisma/client";
import prismaClient from "../service/prisma";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/token";
import { asyncHandler } from "../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponce } from "../utils/apiResponce";
class User{
    private prisma : PrismaClient
    constructor(Prisma:PrismaClient = prismaClient){
        this.prisma = Prisma
    }


    // sign up user

    signUp = asyncHandler(async (req:Request,res:Response)=> {
        const {username,email,password}= req.body;
        const existingUser = await this.prisma.user.findFirst({
            where:{
                OR:[{username},{email}]
            }
        })

        if(existingUser){
            throw new ApiError(existingUser.email === email? "Email already taken ": "Username already taken",401)
        }
        
        this.prisma.$transaction( async(tx)=>{
            const hashedPassword =  await bcrypt.hash(password,10)

            const newUser = await tx.user.create({
                data:{
                    username,
                    email,
                    password:hashedPassword
                }
            })


            return res.json(new ApiResponce(201,newUser,"User registred successfully"))

                
        })
    })


}

export default new User