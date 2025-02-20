import { Kafka, Producer } from "kafkajs";
import fs from "fs"
import path from "path";
import prismaClient from "./prisma";

const kafka = new Kafka({
    brokers:[process.env.KAFKA_URL as string],
    ssl:{
        ca:[fs.readFileSync(path.resolve("ca.pem"),"utf-8")]
    },
    sasl:{
        username: process.env.KAFKA_USERNAME as string,
        password: process.env.KAFKA_PASSWORD as string,
        mechanism:"plain"
    }
})


// Producer
let producer : Producer | null = null
const createProducer = async ()=>{
    if(producer) return producer

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return  producer
}

const produceMessage = async (message:string)=>{
    const producer= await createProducer()
    await producer.send({
        topic:"MESSAGE",
        messages:[{key: `msg-${Date.now()}`,value: message}]
    })

    return true
}

// consumer

const startMessageConsume= async ()=>{
    const consumer = kafka.consumer({groupId:"default"})
    await consumer.connect()
    await consumer.subscribe({topic:"MESSAGE",fromBeginning:true})


    await consumer.run({
        autoCommit:true,
        eachMessage:async ({message,pause})=>{
            console.log("Consumeing started...");
            
            try {
                await prismaClient.message.create({
                    data:{
                        text: message.value?.toString() as string
                    }
                })
            } catch (error) {
                console.log("Error in consume message to database",error);
                
                pause()
                setTimeout(()=>{
                    consumer.resume([{topic:"MESSAGE"}])
                },60*1000)

            }
        }
    })
}

export  {kafka,produceMessage,startMessageConsume}