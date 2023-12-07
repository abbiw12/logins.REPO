const express = require("express")
const prisma = require('../context');
const { userLogin,adminLogin } = require("../controller/userloginController");

const userRouter = express.Router()

userRouter.post("/user-login",userLogin)
userRouter.post("/admin-login",adminLogin)

module.exports = userRouter;