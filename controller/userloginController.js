const prisma = require('../context');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const getAllUsers =async(req,res) => {
    const allUsers = await prisma.user.findMany({
        select: {
            id:true
        }
    })
    res.json({allUsers,msg: "these are all the users in the table."})
}

const userSignUp = async(req,res) => {
    try { 
    const {Name,userName,email,password} = req.body

    const haspassword = await bcrypt.hash(password,10)

   const newUser = await prisma.user.create({
    data: {
        Name,
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
        
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({ msg: "Internal server error" })
    }
    
   
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return res.status(400).json({ msg: "Invalid username or password" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return res.status(400).json({ msg: "Invalid username or password" });

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET);

        return res.status(200).json({ data: { token: accessToken }, msg: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


const userUpdate =async(req,res)=> {
    
        const { userName, email} = req.body;
        const { id } = req.params;
        const updateUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            userName,
            email
          },
        });
        res.json({updateUser,msg: "update successful"})
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

module.exports = {
    getAllUsers,
    userSignUp,
    userLogin,
    userUpdate,
    userdelete
}