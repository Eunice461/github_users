const https = require('https')
const http = require('http')
const fs = require('fs');

require('dotenv').config()

const schedule = require('./middleware/scheduler')

const app = require('./app')


const { mongoConnect } = require('./services/mongo')

const PORT = process.env.PORT || 3000;

const hostname = 'www.100pcotton.com'
const httpsPort = '0.0.0.0';

const httpsOptions = {
cert: fs.readFileSync('ssl/100pcotton_com.crt'),
ca: fs.readFileSync('ssl/100pcotton_com.ca-bundle'),
key: fs.readFileSync('ssl/private.key')
};

const httpsServer = https.createServer(httpsOptions, app)
const server = http.createServer(app)


async function startHttpsServer(){
await mongoConnect()

server.listen(PORT, process.env.IP, hostname, () => {
console.log(`Server is Listening on Port ${PORT}`);
});
}

startHttpsServer();
