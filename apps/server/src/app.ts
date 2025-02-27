import express from "express"
import cookieParser from "cookie-parser";



const app = express()

app.use(express.json())
app.use(cookieParser())


import userRoute from "./routes/user.routes"

app.use("/user",userRoute)




export {app}