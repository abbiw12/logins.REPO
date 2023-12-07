const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userRouter = require("./router/userlogins");

const app = express();
portNumber = 4002;
const prisma = new PrismaClient();
app.use(express.json());



app.use("/user",userRouter)

app.post("/signUp", async(req,res) => {
    const haspassword = await prisma.user.hash(password,10)

    const {userName,email,password} = req.body

   const newUser = await prisma.user.create({
    data: {
        userName,
        email,
        password: haspassword
    },
    select: {
        userName:true,
        email: true,
        
    }
   })
   res.json({ success:true, user:newUser})
})

app.listen(portNumber,() => {
    console.log(`server is running on port${portNumber}`)
})