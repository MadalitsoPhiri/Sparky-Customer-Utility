const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
      conversationId:{
          type:String,
          required:true
      },
      senderId:{
          type:String,
          required:true
      },
      text:{
          type:String,
          required:true
      },
      unread:{
          type:Boolean,
          default:true
      }
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Messages',messageSchema);