const mongoose = require('mongoose');




const customerSchema = new mongoose.Schema({
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
    
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Customers",customerSchema);