const express =require("express")
const prisma = require('../context');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSignUp = async(req,res) => {
    const haspassword = await prisma.user.hash(password,10)

    const {userName,email,password} = req.body

   const newUser = await prisma.user.create({
    data: {
        userName,
        email,
        password: haspassword
    },
    select: {
        userName:true,
        email: true,
        
    }
   })
   res.json({ success:true, user:newUser})
}
const userLogin = async(req,res) => {
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) return res.status(400).json({ msg: "Invalid username or password" })

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if(!isPasswordMatch) return res.status(400).json({msg: "Invalid username or password"})
    const payload= {
        id: user.id,
        email: user.email,
        role: user.role
        }

    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).json({data:{ token:accessToken},msg: "login successful"})


}
const userUpdate =async(req,res)=> {
    async(req,res) => {
        const { userName, email, password } = req.body;
        const { id } = req.params;
        const updateUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            userName,
            email,
            password,
          },
        });
        res.json(updateUser)
    }
}
const userdelete =async(req,res) => {
    const id = req.params.id
    const existing = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if(existing){
        return await prisma.user.delete(
            {
            where: {
                id: parseInt(id)
            }
        }
        )
    } else {
        res.json("Id does not exist")
    }
}


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
    userSignUp,
    userLogin,
    adminLogin,
    userUpdate,
    userdelete
}