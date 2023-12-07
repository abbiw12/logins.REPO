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

app.use("/signUp",userRouter)

app.use("/update",userRouter)
app.use("/delete",userRouter)

app.listen(portNumber,() => {
    console.log(`server is running on port${portNumber}`)
})