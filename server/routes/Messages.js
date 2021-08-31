const router = require('express').Router();
const MessagesModel = require('../models/Message');
const ConversationModel = require('../models/Conversation');
const io = require('../socket').getio();
//send new message
router.post('/',async(req,res)=>{
    const message = new MessagesModel(req.body)
    try{
       await ConversationModel.findByIdAndUpdate(req.body.conversationId,{lastMessage:req.body.text})
       const savedMessage = await message.save()
       io.to(`${req.body.conversationId}`).emit('onNewMessage',message);
       res.status(200).json({message:"new message sent",conversation:savedMessage})
       
    }catch(err){
       res.status(500).json({message:"internal server error"})
       console.log(err)
    }
})

//get Messages 
router.get('/:conversationId',async(req,res)=>{
try{
   const messages = await MessagesModel.find({
      conversationId:req.params.conversationId,
   });
   res.status(200).json({message:"succsesfully got messages",messages})
}catch(err){
res.status(500).json({mesage:"internal server error"})
console.log(err)
}
})

//update message
router.put('/',(req,res)=>{

})





module.exports = router