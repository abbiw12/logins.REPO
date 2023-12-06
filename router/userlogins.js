const express = require("express")
const prisma = require('../context');
const { userLogin } = require("../controller/userloginController");

const userloginRouter = express.Router()

userloginRouter.post("/user-login",userLogin)

module.exports = userloginRouter;