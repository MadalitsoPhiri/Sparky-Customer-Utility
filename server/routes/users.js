const router = require('express').Router();
const UserModel = require('../models/user.model')

router.get("/",(req,res)=>{
res.json({user:"endpoint"})
})

//update user 
router.put("/:id",async(req,res)=>{
    res.json({id:req.params.id})
})
//delete user  

//get a user
 

module.exports = router