const router = require('express').Router();
const CustomerModel = require('../models/Customer');

//get customer
router.get('/:id',async(req,res)=>{
try{
const customer = await CustomerModel.findById(req.params.id)
if(customer != null){
    res.status(200).json({message:"found one record succsessfuly",customer})
}else{
    res.status(404).json({message:"no record found"})
}

}catch(err){
res.status(500).json({message:"internal server error"})
}
})

//create new customer
router.post('/create',async(req,res)=>{
    let customerDetails = req.body.customerDetails
     try{
         const customer = await CustomerModel.findOneAndUpdate({email:{$eq:customerDetails.email}},customerDetails,{
            new: true,
            upsert: true // Make this update into an upsert
          })
       
         res.status(200).json({message:"succsessfully logged new customer in",customer})
     }catch(err){
         console.log(err)
         if(err.code == 11000){
            res.status(409).json({message:"user Already exists"})
         }else{
            res.status(500).json({message:"internal server error"})
         }
       
     }
})

//update customer
router.put('/',async(req,res)=>{
    try{
        
       
        const customer = await CustomerModel.findOneAndUpdate({email:req.body.customerDetails.email},req.body.customerDetails,{
            new: true,
            upsert: true // Make this update into an upsert
          })
      
        res.status(200).json({message:"succsessfully update new customer",customer})
    }catch(err){
      res.status(500).json({message:"internal server error"})
      console.log(err)
    }
})

//delete customer
router.delete('/:id',async(req,res)=>{
  try{
       await CustomerModel.findByIdAndDelete(req.params.id)
       res.status(200).json({message:"customer deleted succesfully"})
  }catch(err){
       res.status(500).json({message:"internal server error"})
  }
})



module.exports = router