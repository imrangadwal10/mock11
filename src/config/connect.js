const mongoose=require("mongoose");
mongoose.set("strictQuery", false);

const connect=async()=>{
  return  mongoose.connect("mongodb+srv://mock:mock777@cluster0.opjfb3u.mongodb.net/mock11")
}

module.exports=connect;