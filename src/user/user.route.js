const UserModel=require("./user.model")
const {Router} = require("express");
const argon2 = require('argon2');
const jwt=require("jsonwebtoken")
const app = Router()


app.post("/signup",async(req,res)=>{
           const {email,password}=req.body;

           const hash = await argon2.hash(password);

       try{
       
         const findUser= await UserModel.findOne({email})
       
          if(findUser){
            return res.send("User already exist")
          } 

        const user=new UserModel({email:email,password:hash});
        await user.save()
        return res.status(201).send("user created successfully");
       }catch(e){
        res.send(e.message)
       }
})


app.post("/signin",async(req,res)=>{
   const {email,password}=req.body;

   const user=await UserModel.findOne({email})

 try{
      const verify =await argon2.verify(user.password,password)
      if(verify){
       const token=jwt.sign({id:user._id,email:user.email},"MOCK11",{expiresIn:"7 days"})
   
       
        res.send({message:"login successfull",token})
      }else{
       res.status(401).send("invalid credintials")
      }
      }catch(e){
            res.send(e.message)
      }
})

module.exports=app;