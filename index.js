const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const adminLogInRouter = require("./router/adminLogin");
const userloginRouter = require("./router/userlogins");
const app = express();
portNumber = 4002;
const prisma = new PrismaClient();
app.use(express.json());

app.use("/user",adminLogInRouter)

app.use("/user",userloginRouter)

app.listen(portNumber,() => {
    console.log(`server is running on port${portNumber}`)
})