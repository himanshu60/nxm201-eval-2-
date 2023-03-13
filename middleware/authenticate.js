const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.schema");
const { LogoutModel } = require("../models/logout.schema")

require("dotenv").config();

const auth = async (req, res, next) => {
    // const token=`${req.cookies.token}`
    const token = req.headers?.authorization?.split(' ')[1]
    const blacklisttoken = await LogoutModel.find({ "token": token });
    try {
        if (blacklisttoken.length > 0) {
            res.send("User Loggedout Please Login again")
        } else {
            jwt.verify(token, process.env.key, async (err, decoded) => {
                if (decoded) {
                    const user = await UserModel.findOne({ _id: decoded.user_id });
                    // console.log(user);
                    req.body = user;
                    next()
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
}
module.exports = { auth }