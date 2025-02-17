import 'dotenv/config'
import http from 'http'
import socketServices from './service/socket';

async function init() {
    const socket = new socketServices()
    const server = http.createServer();
    const PORT = process.env.PORT ?process.env.PORT : 8000

    socket.io.attach(server)

    server.listen(PORT,()=>console.log(`server is running http://localhost:${PORT}`));

    socket.initlisteners()
}


init()
