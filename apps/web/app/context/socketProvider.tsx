"use client"

import React, { createContext, useCallback, useEffect } from "react"
import { io } from "socket.io-client";

interface socketProviderProps{
    children?: React.ReactNode 
}

interface socketContext{
    sendMessage:(msg:string)=>any;
}


export const socketContext = createContext<socketContext | null>(null)

export const SocketProvider:React.FC<socketProviderProps>=({children})=>{

    const sendMessage:socketContext["sendMessage"]=useCallback((msg)=>{
        console.log(msg);
        
    },[])

    useEffect(() => {
      const _socket = io("http://localhost:8000");
      return () => {
        _socket.disconnect();
      }
    }, [])
    
    return(
        <socketContext.Provider value={{sendMessage}}>
            {children}
        </socketContext.Provider>
    )
}