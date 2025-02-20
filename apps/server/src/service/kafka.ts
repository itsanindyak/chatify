import { Kafka, Producer } from "kafkajs";
import fs from "fs"
import path from "path";

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

export  {kafka,produceMessage}