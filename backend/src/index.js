import mongo from './mongo'
import server from './server'

mongo.connect()
const port = process.env.PORT | 4000

server.start({port}, ()=>{
    console.log(`The server is up on PORT ${port}`)
})