const mongoose = require('mongoose');




const agentSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Agents",agentSchema);