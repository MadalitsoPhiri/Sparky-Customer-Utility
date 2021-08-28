const express = require('express')
require('dotenv').config() 

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose');


const MessagesModel = require('./models/Message')
const ConversationModel= require('./models/Conversation')
const dialogflow = require('@google-cloud/dialogflow');
const uuid  = require("uuid");
const { subscribe } = require('./routes/Auth');
const projectId = "appointmentscheduler-njdh"
const agentName = "AppointmentScheduler"
const agentsRoom = "AgentsInfo"
var app = express();  
var server = require('http').createServer(app); 
const io = require('./socket.js').init(server);
const MessagesRoute = require('./routes/Messages')
const AgentRoute = require('./routes/Agents')
const AuthRoute = require('./routes/Auth')
const CustomerRoute = require('./routes/Customers')
const ConversationRoute = require('./routes/Conversations')
let {filterState,setQueuedCustomers,getQueuedCustomers,setBrowsingCustomers,getBrowsingCustomers,setOnlineAgents,getOnlineAgents, setOnlineCustomer,getOnlineCustomer,setLoggedInClients,getLoggedInClients} = require('./agents')





const message = "friday"
  // The text query request.

 

  async function askAgent(projectId,agent,message) {
    // A unique identifier for the given session
    const sessionId = "jfrnfjfhru82615728fkf"
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: message,
            // The language used by the client (en-US)
            languageCode: 'en-US',
          },
        },
      };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log(responses)
  return responses
  }
  

 



const PORT = process.env.PORT || 5000  

let agents = []


app.use(cors({
  origin: '*'
}));
app.use(express.json())
app.use(helmet())
app.use(morgan("common")) 

app.get("/",(req,res)=>{
res.json({sparky:"hi"})
})

app.use("/api/agents",AgentRoute)
app.use("/api/auth",AuthRoute)
app.use('/api/customers',CustomerRoute)
app.use('/api/conversations',ConversationRoute)
app.use('/api/messages',MessagesRoute)



const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true,  useUnifiedTopology: true,useFindAndModify:false});
const connection = mongoose.connection
connection.once('open',()=>{
  console.log("MongoDb connected!")
})
 server.listen(PORT,()=>{
  console.log('express server runing')
});



 

//an event for all socket connections from clients
io.on('connection',(client)=>{
    //setup event listeners on the client socket here
    console.log('new client connected',client.id)
    client.on('disconnect',async() =>{
     
     

        console.log('client disconnected',client.id)
        filterState(client)
   
     

        io.to(agentsRoom).emit("agent-info",{onlineAgents:getOnlineAgents(),browsingCustomers:getBrowsingCustomers(),QueuedCustomers:getQueuedCustomers(),loggedInClients:getLoggedInClients()})
           

         
       
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
  

    client.on('message',async(msg)=>{
     console.log(msg)
    const res = await askAgent(projectId,agentName,msg)
  
     client.emit('response',res[0].queryResult.fulfillmentText )

   

  })


  client.on('agentLoggedIn',async(user)=>{
    await conSubscribe(client,user)
    client.join(agentsRoom)
    !getOnlineAgents().some((agent)=> agent.email === user.email) && setOnlineAgents({email:user.email,socketId:client.id,busy:false,agentId:user.agentId})
    io.to(agentsRoom).emit("agent-info",{onlineAgents:getOnlineAgents(),browsingCustomers:getBrowsingCustomers(),QueuedCustomers:getQueuedCustomers(),loggedInClients:getLoggedInClients()})
    console.log(user.agentId)
  
})

client.on('getConMessages',async(id)=>{
  result = await getMessages(id)
  client.emit('conMessages',result)
})

client.on('newMessage',(payload)=>{

 console.log("Said the sky",payload.conversationId)
 sendNewMessage(payload)
})

client.on('onTraffic',()=>{
console.log('customer browsing host site')
// add to browsing list
const customer = {socketId:client.id}


setBrowsingCustomers(customer)

io.to(agentsRoom).emit("agent-info",{onlineAgents:getOnlineAgents(),browsingCustomers:getBrowsingCustomers(),QueuedCustomers:getQueuedCustomers(),loggedInClients:getLoggedInClients()})

})


client.on('customer-login',(user)=>{
  //add to logged in customers
  console.log('customer just logged in')
  const customer = {socketId:client.id,customer:user}

  setLoggedInClients(customer)
 
  io.to(agentsRoom).emit("agent-info",{onlineAgents:getOnlineAgents(),browsingCustomers:getBrowsingCustomers(),QueuedCustomers:getQueuedCustomers(),loggedInClients:getLoggedInClients()})
})



client.on('Queued',(user)=>{
  console.log('customer added to que',user)
  //add to queued list
  const customer = {socketId:client.id,user}

  setQueuedCustomers(customer)

  io.to(agentsRoom).emit("agent-info",{onlineAgents:getOnlineAgents(),browsingCustomers:getBrowsingCustomers(),QueuedCustomers:getQueuedCustomers(),loggedInClients:getLoggedInClients()})
 })
 


})




async function getMessages(id){
  try{
     const messages = await MessagesModel.find({
        conversationId:id,
     });
     console.log(messages)
     return {message:"succsesfully got messages",messages}
  }catch(err){
    console.log(err)
 return {mesage:"internal server error"}

  }
}

async function conSubscribe(socket,user){
  try{
    const conversations = await ConversationModel.find({members:{$in:[user.agentId]}})
    console.log(conversations)
    conversations.map((item,index)=>{
    socket.join(`${item._id}`)

    console.log("coversationId",item._id)
    })

}catch(err){

 console.log(err)
}
}
const sendNewMessage = async(msg)=>{
  console.log(msg)
  const message = new MessagesModel(msg)
  try{
    await ConversationModel.findByIdAndUpdate(msg.conversationId,{lastMessage:msg.text})
    const savedMessage = await message.save()
    io.to(`${msg.conversationId}`).emit('onNewMessage',message);
  
    
 }catch(err){
    
    console.log(err)
 }
}