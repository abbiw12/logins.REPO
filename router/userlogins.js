const express = require("express")
const yup = require("yup")
const { userLogin, userUpdate, userdelete, userSignUp, getAllUsers } = require("../controller/userloginController");
const validations = require( "../Middlewares/validationMiddleeware");
const userRouter = express.Router()
const authSchema =require("../Validations/uservalidations")
  
  
  
userRouter.get("/allUsers",getAllUsers)
userRouter.post("/signUp",userSignUp)
userRouter.post("/login",userLogin)
userRouter.put("/Update",userUpdate)
userRouter.delete("/Delete",userdelete)

module.exports = userRouter;