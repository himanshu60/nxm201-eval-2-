const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const postRouter = express.Router();
const { UserModel } = require("../models/user.schema");
const { LogoutModel } = require("../models/logout.schema")


// signup part
postRouter.post("/signup", async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const arr = ["user", "seller"]
        // if (arr.includes(role)) {
        bcrypt.hash(password, 5, async (err, hash_pass) => {
            if (hash_pass) {
                const user = new UserModel({ name, email, password: hash_pass, role })
                await user.save();

                res.status(201).json({ msg: "Signup sucessfully" })
            } else {
                console.log(err);
                res.status(500).json({ err: err.message })
            }
        })
        // } else {
        //     res.send("Something went wrong");
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

// login part
postRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ msg: "User not found" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ user_id: user._id, user_role: user.role }, process.env.key, { expiresIn: "1m" });
                const refreshtoken = jwt.sign({ user_id: user._id, user_role: user.role }, process.env.refreshkey, { expiresIn: "5m" });
                res.cookie("token", token);
                res.cookie("refreshtoken", refreshtoken);
                res.json({ msg: "Logged In sucessfully", token, refreshtoken });

            } else {
                res.status(404).json({ msg: "Wrong details" });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

// logout users
postRouter.post("/logout",async(req,res,next)=>{
    try {
        // const token=`${req.cookies.token}`
        const token=req.headers?.authorization?.split(' ')[1]
        const loggedout=new LogoutModel({token});
        await loggedout.save();
        res.send("Loggedout Sucessfully");

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})

module.exports = { postRouter }