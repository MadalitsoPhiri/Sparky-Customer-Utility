const mongoose = require('mongoose');



const agentSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
      },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const customerSchema = new mongoose.Schema({
    _id:{
      type:String,
      required:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
   
    profilePicture:{
        type:String,
        default:""
    },
    
})



const conversationSchema = new mongoose.Schema({
   members:{
       type:Array
   },// to store who is part of a conversation
   creatorId:{
       type:String,
       required:true
   },//to store who created the conversation
   lastMessage:{
       type:String,
       default:"Hey there send me a text"
   }
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Conversations",conversationSchema);