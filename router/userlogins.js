const express = require("express")
const prisma = require('../context');
const { userLogin, userUpdate, userdelete, userSignUp } = require("../controller/userloginController");

const userRouter = express.Router()

userRouter.post("/signUp",userSignUp)
userRouter.post("/login",userLogin)
userRouter.put("/Update",userUpdate)
userRouter.delete("/Delete",userdelete)
module.exports = userRouter;