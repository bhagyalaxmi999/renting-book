const User = require('../model/userModel')
const Rent = require('../model/rentModel')
const bcrypt = require('bcryptjs')
const { createLoginToken } = require('../util/token')
const jwt = require('jsonwebtoken')

const authController = {
    register: async (req,res) => {
        try {
            const { name, email, mobile, password } = req.body

            // encrypt the password
            const encPass = await bcrypt.hash(password,10)

            // checking email already exists or not
            const extEmail = await User.findOne({ email })
                if(extEmail)
                    return res.status(400).json({ msg: `${email} already exists.`})

            // checking mobile number already exists or not
            const extMobile = await User.findOne({ mobile })
                if(extMobile)
                    return res.status(400).json({ msg: `${mobile} number already exists.`})

            const newUser = await User.create({
                name, 
                email,
                mobile,
                password: encPass
            })
            
            res.json({ msg: "Registered successfully.", data: newUser })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req,res) => {
        try {
            
            const { email, password } = req.body

            // user email exists or not 
            const extUser = await User.findOne({ email })
                    if(!extUser)
                        return res.status(404).json({ msg: `${email} doesn't exists.`})

            // compare the passwords
            const isMatch = await bcrypt.compare(password, extUser.password)
                if(!isMatch)
                    return res.status(400).json({ msg: `Passwords are not matched..`})

            // check if user is active or blocked
                if(!extUser.isActive)
                    return res.status(400).json({ msg: `Hi ${extUser.name},Sorry Your account is blocked.Contact Admin..`})

                    // generate login token
                const token = createLoginToken({ id: extUser._id })

                    // save the token in cookies
                    res.cookie('loginToken', token, {
                        httpOnly: true,
                        signed: true,
                        path: `/api/auth/token`,
                        maxAge: 1 * 24 * 60 * 60 * 1000
                    })
                
                res.json({ msg: "Login Successfully", token })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req,res) => {
        try {
            res.clearCookie('loginToken', { path: `/api/auth/token`})
            res.json({ msg: `Logout successfully`})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    currentUser: async (req,res) => {
        try {
            const data = await User.findById({ _id: req.user.id }).select('-password')
                if(!data)
                    return res.status(404).json({ msg: `Requested user not found`})

            res.json({ currentUser: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    authToken: async (req,res) => {
        try {
            const cToken = req.signedCookies.loginToken
                if(!cToken)
                    return res.status(404).json({ msg: "Token not found,Session Expired"})

                    // verify login Token
                    jwt.verify(cToken, process.env.SECRET_TOKEN, (err,user) => {
                        if(err)
                        return res.status(400).json({ msg: `Invalid Token..Un Authorized..`})

                        // res.json({ user }) 

                         const rToken = createLoginToken({ id : user.id })

                         res.json({ authToken: rToken })
                    })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    allUsers: async (req,res) => {
        try {
            const data = await User.find()

            const users = data.filter(item => item.role !== "superadmin")
            
            return res.status(200).json({ length: users.length, users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    blockUser: async (req,res) => {
        try {
           const id = req.params.id 

           const user = await User.findById({_id: id})
               if(!user)
                    return res.status(404).json({msg: "requested user id not found"})
            
           await User.findByIdAndUpdate( {_id: id},{
                isActive: !user.isActive
           })
                if(user.isActive === true) {
                    return res.status(200).json({msg: "user blocked successfully"})
                }else {
                    return res.status(200).json({msg: "user un-block successfully"})
                }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req,res) => {
        try {
           const id = req.params.id 

           const user = await User.findById({_id: id})
             if(!user)
                 return res.status(404).json({msg: "requested user id not found"})
            
            const data = await Rent.findOne({ userId: id})
                if(data) {
                    return res.status(400).json({ msg: "user have pending rented books,can't delete profile"})
                } 

               
                    await User.findByIdAndDelete({_id:id})
                
            return res.status(200).json({msg: "User deleted successfully"})    

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = authController