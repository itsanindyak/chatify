import jwt from "jsonwebtoken"

interface tokenData{
    id: string;
    username: string;
    email:string;
}


const generateToken = async(data: tokenData)=>{

    const token = await jwt.sign(data, process.env.TOKEN_SECERT as string, { expiresIn: parseInt(process.env.TOKEN_EXPIRE as string, 10) });

    return token;

}


export { generateToken }