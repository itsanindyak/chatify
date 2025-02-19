import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers:[]
})


const createProducer = async ()=>{
    const producer = kafka.producer()
    await producer.connect()
    return  producer
}

const produceMessage = (key:string,message:string)=>{
    
}

export default kafka