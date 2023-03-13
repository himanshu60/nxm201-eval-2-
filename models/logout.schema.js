const mongoose=require("mongoose");

const logoutSchema=new mongoose.Schema({
   token:String
})

const LogoutModel=mongoose.model("blacklisttoken",logoutSchema);

module.exports={LogoutModel}