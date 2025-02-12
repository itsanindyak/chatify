import { Server } from "socket.io";

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
    }

    get io(){
        return this._io
    }

    public initlisteners(){
        const io = this._io
        console.log("Initilize socket listener...");
        
        io.on("connect",(socket)=>{
            console.log("A new user connected",socket.id);
            
            socket.on("event:message", async({message}:{message:string})=>{
                    console.log("User message",message);
                    
            })
        })
    }

}

export default socketServices