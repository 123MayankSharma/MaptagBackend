const router=require("express").Router()

const Pin=require('../models/Pin')

/*
  to store a pin
*/
router.post("/addPin",async  (req,res)=>{
  const newPin=new Pin(req.body)
    
  try{
    const storedPin=await newPin.save()
    res.status(200).send(storedPin)
  }catch(err){
    res.status(500).json(err)
  }
})


/*
  to get all pins
*/

router.get("/",async (req,res)=>{
  try{
      const allPins=await Pin.find({})
      res.status(200).json(allPins)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports=router
