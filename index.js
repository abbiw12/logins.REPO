const { PrismaClient } = require("@prisma/client");
const express = require("express");
const userRouter = require("./router/userlogins");

const app = express();
portNumber = process.env.PORT;
app.use(express.json());

app.use("/user",userRouter)

app.listen(portNumber,() => {
    console.log(`server is running on port${portNumber}`)
})