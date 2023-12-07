const express = require("express")
const prisma = require('../context');
const { userLogin,adminLogin, userUpdate, userdelete, userSignUp } = require("../controller/userloginController");

const userRouter = express.Router()

userRouter.post("/user-signUp",userSignUp)
userRouter.post("/user-login",userLogin)
userRouter.post("/admin-login",adminLogin)
userRouter.put("/user-Update",userUpdate)
userRouter.delete("/user-Delete",userdelete)
module.exports = userRouter;