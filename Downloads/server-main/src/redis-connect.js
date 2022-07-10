const Redis = require('ioredis')
const { URL } = require('url')

//connect to redis 


const redis_url = process.env.REDIS_TLS_URL
//const redis_client = redis.createClient(redis_url)

let redis_client = null
if (redis_url) {
    let { port , hostname: host, password }  = new URL (redis_url)
    let redisOption = {port: Number(port), host, password,   
        tls:{
            rejectUnauthorized: false
        }
       }
    redis_client = new Redis(redisOption)
} else {
    redis_client = new Redis()
}

//redis_client.connect()

redis_client.on('connect', function(){
    console.log('redis client connected');
})

redis_client.on('ready', () => {
    console.log('client is connected to redis and ready to use');
})

redis_client.on('error', (err) => {
    console.log(err);
})

redis_client.on('end', () => {
    console.log('client disconnected from redis');
})

process.on('SIGINT', () => {
    redis_client.quit()
})

module.exports = redis_client;