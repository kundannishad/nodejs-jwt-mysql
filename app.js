require("dotenv").config();
const express = require('express')
const app = express();
app.use(express.json())
const userRouter = require("./api/users/user.router");
app.use("/api/users",userRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log('server up is running',process.env.APP_PORT)
})