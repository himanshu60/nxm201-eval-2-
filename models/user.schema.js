const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,enum:["user","seller"],default:"user"
    }
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}