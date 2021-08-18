const router = require('express').Router();
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register

router.post("/register", async(req,res)=>{
 

    try
    {
        //encrypt password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        req.body['password'] = hashedPassword
        
        //create new user
        const user = await new UserModel(req.body)

        //save to mongodb
        await user.save()
        res.status(200).json(user)
    }catch(err){
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              // Duplicate username
              return res.status(422).json({ success: false, message: 'User already exist!' });
            }
      
           
          }
      
        res.status(500).json(err)
       
    }
  
   
    })


router.post('/login',async(req,res)=>{

    try{
        console.log(req.body)
        const user = await UserModel.findOne({email:req.body.email})
       
        if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword){
                console.log(process.env.TOKEN_SECRET)
                const token = jwt.sign({email:user.email,user:user.password},process.env.TOKEN_SECRET,{expiresIn:"30m"})
                res.status(200).json({message:"login successful",payload:{email:user.email,token:token}})
            }else{
                res.status(400).json({message:"wrong password"})
            } 
           
        }
 
        else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error",error:err})
    }
  
    
}) 

router.get("/",(req,res)=>{
res.json({user:"unauthorized"})
})

module.exports = router