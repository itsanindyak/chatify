import Redis from "ioredis";

const pub = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})


const sub = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})



export {pub,sub}