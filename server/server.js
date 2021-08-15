var express = require('express');  
var app = express(); 
const redis = require('redis');
const redisClient = redis.createClient(); 
var server = require('http').createServer(app);  
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

var agents = []
var clients = []


server.listen(4200);

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




redisClient.on('connect', function() {
    console.log('redis server Connected!');
  });