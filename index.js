const express = require("express");
const cookieParser=require("cookie-parser")
const { postRouter } = require("./routes/post.route")
const { connection } = require("./config/db")
const {getRouter}=require("./routes/get.route")
const {newtokenRouter}=require("./routes/newtoken.route")
const app = express();
app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Welcome to my page")
})



app.use("/",getRouter)
app.use("/", postRouter)
app.use("/", newtokenRouter)


// Invalid endpoint
app.get("*",(req,res)=>{
    res.status(404).json("Invalid Endpoints")
})

app.listen(process.env.port, async (req, res) => {
    try {
        await connection
        console.log(`port is connected to ${process.env.port}`)

    } catch (error) {
        console.log(error)
    }

})