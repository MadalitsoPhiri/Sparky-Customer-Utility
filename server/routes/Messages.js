const router = require('express').Router();
const MessagesModel = require('../models/Message');
const ConversationModel = require('../models/Conversation')
//send new message
router.post('/',async(req,res)=>{
    const message = new MessagesModel(req.body)
    try{
       await ConversationModel.findByIdAndUpdate(req.body.conversationId,{lastMessage:req.body.text})
       const savedMessage = await message.save()
       res.status(200).json({message:"new message sent",conversation:savedMessage})
    }catch(err){
       res.status(500).json({message:"internal server error"})
       console.log(err)
    }
})

//get Messages 
router.get('/:conversationId',(req,res)=>{

})

//update message
router.put('/',(req,res)=>{

})





module.exports = router