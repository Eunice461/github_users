const http = require('http');

require('dotenv').config()

const schedule = require('./middleware/scheduler')

const app = require('./app')


const { mongoConnect } = require('./services/mongo')

const PORT =process.env.PORT || 5000;

const server = http.createServer(app)

async function startServer(){
    await mongoConnect()

    server.listen(PORT, () => {
			console.log(`Server is Listening on Port ${PORT}`);
		}); 
}
startServer();