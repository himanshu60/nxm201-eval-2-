const express=require("express");
const {auth}=require("../middleware/authenticate")
const {authorization}=require("../middleware/authorization")

const getRouter=express.Router();
require("dotenv").config();


getRouter.get("/products",auth,authorization(["user","seller"]), (req,res)=>{
    try {
        res.send("This is Products data")
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

getRouter.get("/addproducts",auth,authorization(["seller"]),(req,res)=>{
    try {
        res.send("This is addProducts data")
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

getRouter.get("/deleteproducts",auth,authorization(["seller"]) ,(req,res)=>{
    try {
        res.send("This is deletedProducts data")
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

module.exports={getRouter}