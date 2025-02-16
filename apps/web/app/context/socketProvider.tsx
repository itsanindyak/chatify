"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { io,Socket } from "socket.io-client";

interface socketProviderProps{
    children?: React.ReactNode 
}

interface socketContext{
    sendMessage:(msg:string)=>any;
}

// create context using socketContext interface
export const socketContext = createContext<socketContext | null>(null)

export const useSocket= ()=>{
    const state = useContext(socketContext)

    if(!state) throw new Error("No state available")

    return state;
}

export const SocketProvider:React.FC<socketProviderProps>=({children})=>{

    const [socket,setSocket]= useState<Socket>()

   

    const sendMessage:socketContext["sendMessage"]=useCallback((msg)=>{

        if(socket){
            console.log("Message :--->",msg);
            socket.emit("event:message",{message:msg})
        }
        
    },[socket])
    useEffect(() => {
        const _socket = io("http://localhost:8000");
        setSocket(_socket)
        return () => {
        _socket.disconnect();
        setSocket(undefined)
        }
    }, [])
    
    return(
        <socketContext.Provider value={{sendMessage}}>
            {children}
        </socketContext.Provider>
    )
}