import { Server } from "socket.io";
import { pub,sub } from "../DB/Redis";
import { produceMessage } from "./kafka";

class socketServices{
    private _io:Server

    constructor(){
        console.log("Scoket server initialize....");
        
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
        })

        sub.subscribe("MESSAGES")
    }

    get io(){
        return this._io
    }

    public initlisteners(){
        const io = this._io
        console.log("Initilize socket listener...");
        
        io.on("connect",(socket)=>{
            console.log("A new user connected",socket.id);
            socket.on("event:message", async(msg)=>{
                const message ={...msg,id:socket.id}                
                    // publish message to redis pub
                    pub.publish("MESSAGES",JSON.stringify(message))
                    
            })
        })


        sub.on("message",async(channel,message)=>{
            if(channel === "MESSAGES"){
                io.emit("message",JSON.parse(message))
                await produceMessage(message)
            }
        })
    }

}

export default socketServices