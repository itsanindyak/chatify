"use client"

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { io,Socket } from "socket.io-client";

interface socketProviderProps{
    children?: React.ReactNode 
}
interface socketContext{
    sendingMessage:(msg:string)=>any;
    Messages: Message[]
}
interface Message{
    id: string
    text: string;
    send: boolean;
    timestamp: string;

}
interface sendMessage {
    text: string;
    timestamp: string;
}



// create context using socketContext interface
export const socketContext = createContext<socketContext | null>(null)
// use all created context by useContext hooks
export const useSocket= ()=>{
    const state = useContext(socketContext)

    if(!state) throw new Error("No state available")

    return state;
}


// scoket provider functional component
export const SocketProvider:React.FC<socketProviderProps>=({children})=>{

    const [socket,setSocket]= useState<Socket>()
    const socketIdRef = useRef<string>("");
    const [Messages,setMessages]= useState<Message[]>([])

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        _socket.on("connect",()=>{
            setSocket(_socket)
            socketIdRef.current= _socket.id as string
        })
        _socket.on("message",onMessageRecive)

        return () => {
        _socket.disconnect();
        _socket.off("message",onMessageRecive)
        setSocket(undefined)
        }
    }, [])

    // sending message to socket
    const sendingMessage:socketContext["sendingMessage"]=useCallback((msg)=>{
        const currentMessage:sendMessage = {
            text: msg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        if(socket){
            socket.emit("event:message",currentMessage)
        }
        
    },[socket])

    
    // recived message from socket
    const onMessageRecive = useCallback((msg:Message)=>{

            msg.id === socketIdRef.current ? msg.send = true : msg.send = false
            console.log(msg);
            setMessages(prev => [...prev, msg])
            


            
    },[])
    
    return(
        <socketContext.Provider value={{sendingMessage,Messages}}>
            {children}
        </socketContext.Provider>
    )
}


export  type {sendMessage}