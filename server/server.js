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
let onlineAgents = require('./agents').onlineAgents;


const message = "friday"
  // The text query request.

  var config = {
    credentials: {
      private_key:  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDt8Mpy/wjNG72+\nwInRE9bq6ak3AFbuZYeBIrWM4T/h8B2ig6OqC8u/xSB7wuqPk9NKakdLO0+OLIlH\nmJC877OKnp5r9TeK+n7d9OMIVnGX8uaICsvQUX53ANrB/6AH0D+K7MOE95wiZB3u\n737WRUbkY2sgUpIhIHzoOCypqEVdOLiA+HCYknICuXcTIPfGQsaO2QyRDyhZGGNF\nRJvPBGD9xFdMFuCQsc+8ViKTw+U3qE8DYfUAWjhbNvblotlmctZjbLS3CdSohPOd\nqzl3DwD9KIzOZ4jT7GL8o15PkUy4Tt1xguMlXcceYIE+3eLuvWccMyhUn9A91p4A\n1cCPr9X/AgMBAAECggEAWGwTp+F7wVEuVa1SadagFwNHRW/EXmpvjT87TYPFjC6B\nrMuTrhUdHgJhHGzmYv3R1sUhAmWjnleRmoApRXUkeP6SK9dgUS7ep5giKI6LPybe\noa61aBBo2UuBf/eBXnX2rydmT0r/BE7FSu5IadMr0aLahBP7RwE+OcPqYQ/t2wKK\nJLUc0vexEKg+77x5UIw6/CqAAwipKk+v6Av7TOh9/OG4HE3ckyiw5JAyY9VSCfuU\nC/3kEas7C1zDmVo3OTKsfRc+qygjRtrvN4V30Phc7ChWfB+6opSfvecnJUlxl/4P\n/FENUlDkWJzLSOhD7NNc3mUxp50G3i6sMa0NZzxmIQKBgQD6xga5Fk2Xq8VaQ19h\n6Z0FrLVrlAqFaOxRkP+y7dqiEaZYcOmUAo81vEXDBzznCeKovMDD0+xSv0dh4IGj\ncwIbQiHHFzP4KHdlpWu1LaCFV3LYpevR6VY07k85YnO9edkOH61s2gn3+w+eZOgA\nLucLFiwJzsChyDnV4dX+jtZyYQKBgQDy5ku5xJnbt97mSKjIgBgV7U1s84ed82fs\nj0aFAFeSRBW+gU4DBcCM9qO4/CKcPaioo+Xjg8FABvm7NO1SBcX4o9eFUhsIRmf7\nwa0cQDjBTQhn7gmgUveoxr3rhNID7S8zIHC61ys6aCNN9IsWHMVZl7shux7kLFI8\nc9Af413kXwKBgBRkH83TC3ImzIBfdBURGuyIM6RQwF5CvtyPDsus3ZdKGh2c6NFZ\nN+3lpkKKhyA+RIj1+DK0O8YquZIy4De7NVOkF/0JXPdzyumf/tcXo7LT/omxTDCg\naZsaOaTv5XtlugmU99QfEqpwZr+5csf5CF51ahVOE4nULye+Gll9oeBhAoGAYSNq\nS0ttgGoDETMjlLNtbm9tVFH7/VXXTMprmErvuoXR8FLDwP+u5nDIPvVOXg9mgLKz\nAA6z3QgtHQnokrHOX0YeramNN/z4Hr1wnmisidllsDKI1P35Hx0D3MlMN9fF1Xt2\nubHNDtmQrN9MNDajUdYVN0Me8n8rEBP8upPx+58CgYAvn9kaYhGW2V4pFhy4SIKK\nENYoTu7VkBaOcltqv7IkLNuaccpTbogkj55NjPjWBdZLePwd13CEA0e3bpfdPbqi\niBYJGKUT/XAIOsznumZBC3JAf7udGpivC4fh9g1J2pQq4pV3+BgDj+cO19ggUrCw\ntGhSZSvbpgXPZZ6zfhnUVQ==\n-----END PRIVATE KEY-----\n",
      client_email: "dialogflowapi@appointmentscheduler-njdh.iam.gserviceaccount.com"
    }
  }
  

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
let clients = []

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
io.on('connection',client=>{
    //setup event listeners on the client socket here
    console.log('new client connected',client.id)
    client.on('disconnect',() =>{
     
     

        console.log('client disconnected',client.id)
        onlineAgents = onlineAgents.filter(agent => agent.socketId == client.id)

        io.to(agentsRoom).emit("agent-info",onlineAgents)
           

         
       
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

    client.on('message',async(msg)=>{
     console.log(msg)
    const res = await askAgent(projectId,agentName,msg)
  
     client.emit('response',res[0].queryResult.fulfillmentText )

   

  })


  client.on('agentLoggedIn',async(user)=>{
    await conSubscribe(client,user)
    client.join(agentsRoom)
    !onlineAgents.some((agent)=> agent.email === user.email) && onlineAgents.push({email:user.email,socketId:client.id,busy:false,agentId:user.agentId})
    io.to(agentsRoom).emit("agent-info",onlineAgents)
    console.log(user.agentId)
  
})

client.on('getConMessages',async(id)=>{
  result = await getMessages(id)
  client.emit('conMessages',result)
})

client.on('newMessage',(payload)=>{
 const {conversation,message,agentId} = payload;
 console.log("Said the sky",conversation._id)
 sendNewMessage(conversation,message,agentId)
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
const sendNewMessage = async(conversation,msg,agentId)=>{
  const message = new MessagesModel({conversationId:conversation._id,senderId:agentId,text:msg})
  try{
    await ConversationModel.findByIdAndUpdate(conversation._id,{lastMessage:msg})
    const savedMessage = await message.save()
    io.to(`${conversation._id}`).emit('onNewMessage',message);
  
    
 }catch(err){
    
    console.log(err)
 }
}