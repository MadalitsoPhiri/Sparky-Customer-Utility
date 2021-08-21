const router = require('express').Router();
const ConversationModel = require('../models/Conversation');
const MessagesModel = require('../models/Message')

//create conversation
router.post('/',async(req,res)=>{
    const conversation = new ConversationModel({
        members:[req.body.senderId,req.body.receiverId],
        creatorId:req.body.senderId
    })
    try{
       const savedConversation = await conversation.save()
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

module.exports = router