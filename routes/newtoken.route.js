const express = require("express");
const jwt = require("jsonwebtoken"); 

require("dotenv").config();

const newtokenRouter=express.Router();

newtokenRouter.get("/newtoken",async(req,res)=>{
    try {
        const refreshtoken=req.headers?.authorization?.split(' ')[1]
         jwt.verify(refreshtoken,process.env.refreshkey,(err,decoded)=>{
            if(!decoded){
                res.status(401).json({msg:"Please Login again"})
            }else{
                const token = jwt.sign({ user_id: decoded.user_id, user_role: decoded.user_role }, process.env.key, { expiresIn: "1m" });
                res.cookie("token", token);
                res.json({  token});

            }
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})


module.exports={newtokenRouter}