import http from 'http'


async function init() {
   
    const server = http.createServer();
    const PORT = process.env.PORT ?process.env.PORT : 8000

    server.listen(PORT,()=>console.log(`server is running http://localhost:${PORT}`));

    
}

init()
