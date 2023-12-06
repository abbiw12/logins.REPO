const express = require("express")
const prisma = require('../context');
const { adminLogin } = require("../controller/adminLoginsControllers");

const adminLogInRouter = express.Router()

adminLogInRouter.post("/admin-login",adminLogin)

module.exports = adminLogInRouter;