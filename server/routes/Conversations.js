const router = require('express').Router();
const ConversationModel = require('../models/Conversation');
const MessagesModel = require('../models/Message')
const io = require('../socket').getio();
let {getOnlineAgents,getQueuedCustomers} = require('../agents')



//create conversation
router.post('/',async(req,res)=>{
    const conversation = new ConversationModel({
        members:[req.body.senderId,req.body.receiverId],
        creatorId:req.body.senderId
    })
    try{
       const savedConversation = await conversation.save()
        await notifyAgents(savedConversation)
        await notifyClient(savedConversation)
    io.to(`${savedConversation._id}`).emit('onNewConversation',savedConversation);
    console.log("onlineAgents:",getOnlineAgents())
    console.log("QueuedCustomers:",getQueuedCustomers())


       res.status(200).json({message:"new Conversation created",conversation:savedConversation})
    }catch(err){
       res.status(500).json({message:"internal server error"})
       console.log(err)
    }
})

// delete conversation
router.delete('/:id',async(req,res)=>{
    console.log(`deleted conversation: `,req.params.id)
    try{
        await ConversationModel.findByIdAndDelete(req.params.id)
        await MessagesModel.deleteMany({conversationId:{ $in: [req.params.id]}})
        res.status(200).json({message:"conversation deleted succesfully"})
   }catch(err){
        res.status(500).json({message:"internal server error"})
   }
})


//get agent conversations
router.get('/:userId',async(req,res)=>{
   try{
       const conversations = await ConversationModel.find({members:{$in:[req.params.userId]}})
       res.status(200).json({message:"Successfully got conversations",conversations})
   }catch(err){
    res.status(500).json({message:"internal server error"})
    console.log(err)
}
})

const notifyAgents = async(conversation)=>{
  const agent = getOnlineAgents().find(a=>conversation.members.includes(a.agentId))
  if(agent){
    const sockets = await io.in(agent.socketId).fetchSockets();
    console.log("is agent")

    for (const socket of sockets) {
     
        socket.join(`${conversation._id}`);
        console.log("agent joining conversation: ",agent.socketId)
     
      }
     
  }
}


const notifyClient = async(conversation)=>{
   
    const customer = getQueuedCustomers().find(a=>conversation.members.includes(a.user._id))
    
    if(customer){
        console.log("is client")
      const sockets = await io.in(customer.socketId).fetchSockets();
      for (const socket of sockets) {
       
          socket.join(`${conversation._id}`);
          console.log("client joining conversation: ",customer.user.socketId)
        }
    }
  }

module.exports = router