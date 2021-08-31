const router = require('express').Router();
const AgentModel = require('../models/Agent');

router.get("/",(req,res)=>{
res.json({agent:"endpoint"})
})

//create agent
router.post("/create",async(req,res)=>{
    res.json({id:req.params.id})
})

//update agent 
router.put("/:id",async(req,res)=>{
    res.json({id:req.params.id})
})
//delete agent  
router.delete("/delete/:id",async(req,res)=>{
    res.json({id:req.params.id})
})
//get an agent
router.get("/:id",async(req,res)=>{
    res.json({id:req.params.id})
})

module.exports = router