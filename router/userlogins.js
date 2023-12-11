const express = require("express")
const { userLogin, userUpdate, userdelete, userSignUp, getAllUsers } = require("../controller/userloginController");

const userRouter = express.Router()

userRouter.get("/allUsers",getAllUsers)
userRouter.post("/signUp",userSignUp)
userRouter.post("/login",userLogin)
userRouter.put("/Update",userUpdate)
userRouter.delete("/Delete",userdelete)
module.exports = userRouter;