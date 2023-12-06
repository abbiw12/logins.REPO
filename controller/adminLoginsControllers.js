const express =require("express")
const prisma = require('../context');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminLogin = async(req,res) => {
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
   

    if (!user) return res.status(400).json({ msg: "Invalid username or password" })

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if(!isPasswordMatch) return res.status(400).json({msg: "Invalid username or password"})
    if (user.role == 'user') return res.status(403).json({ msg: "not authorized" })
    const payload= {
        id: user.id,
        email: user.email,
        role: user.role
        }

    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).json({data:{ token:accessToken},msg: "login successful"})


}

module.exports = {
    adminLogin
}