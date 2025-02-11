"use client"

import { log } from "console";
import React, { createContext, useCallback } from "react"

interface socketProviderProps{
    children?: React.ReactNode 
}
interface socketContext{
    sendMessage:(msg:string)=>any;
}


export const socketContext = createContext<socketContext | null>(null)

export const socketProvider:React.FC<socketProviderProps>=({children})=>{

    const sendMessage:socketContext["sendMessage"]=useCallback((msg)=>{
        console.log(msg);
        
    },[])
    return(
        <socketContext.Provider value={{sendMessage}}>
            {children}
        </socketContext.Provider>
    )
}