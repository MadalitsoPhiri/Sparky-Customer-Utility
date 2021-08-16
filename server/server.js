const express = require('express');  
const app = express();
require('dotenv').config() 
const redis = require('redis');
const redisClient = redis.createClient(); 
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')





const PORT = process.env.PORT || 5000  

const agents = []
const clients = []

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common")) 


app.get("/",(req,res)=>{
res.json({spark:"hi"})
})

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true,  useUnifiedTopology: true});
const connection = mongoose.connection
connection.once('open',()=>{
  console.log("MongoDb connected!")
})
var server = app.listen(PORT,()=>{
  console.log('express server runing')
});

//redis server listening
redisClient.on('connect', function() {
  console.log('redis server Connected!');
});


var io = require('socket.io')(server, {
  cors: {
    origin: '*',//change this in production
  }
});


//an event for all socket connections from clients
io.on('connection',client=>{
    //setup event listeners on the client socket here
    console.log('new client connected',client.id)
    client.on('disconnect',() =>{
        console.log('client disconnected',client.id)
              agents = agents.filter(id => id != client.id)
              clients = clients.filter(id => id != client.id)

         
            client.emit('num-agents',agents.length)
            client.broadcast.emit('num-agents',agents.length)
    
          
            client.emit('client-disconnected',clients.length)
            client.broadcast.emit('client-disconnected',clients.length)
       
       
    })
    client.on('agent-logged-in',()=>{
        agents.push(client.id)
        client.emit('num-agents',agents.length)
        client.broadcast.emit('num-agents',agents.length)
    })

    client.on('get-num-agents',()=>{
        client.emit('num-agents',agents.length)
        client.broadcast.emit('num-agents',agents.length)
    })
    client.on('client-connected',()=>{
        clients.push(client.id)
        client.emit('client-connected',clients.length)
        client.broadcast.emit('client-connected',clients.length)

    })
})






