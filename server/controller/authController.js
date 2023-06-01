const User = require('../model/userModel')
const bcrypt = require('bcryptjs')

const authController = {
      register: async (req,res) => {
            try {
               const { name, email, mobile, password } = req.body
               
            //    encrypt the password
               const encPass = await bcrypt.hash(password,10)//10 bit has generate
            
               // checing email already exists or not    

                const extEmail = await User.findOne({ email })
                  if(extEmail)
                     return res.status(400).json({ msg : `${email} already exists.`})
                
                    //  checking mobile number already exists or not
                const extMobile = await User.findOne({ mobile }) 
                  if(extMobile)
                    return res.status(400).json({ msg: `${mobile} number already exists.`})   

               const newUser = await User.create({
                name,
                email,
                mobile,
                password: encPass
            })

               res.json({ msg: "Registered successfully. ",data: newUser})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }
      },
      login: async (req,res) => {
            try {
                res.json({ msg: 'login called'})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      logout: async(req,res) => {
            try {
                res.json({ msg: 'logout called'})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      currentUser: async (req,res) => {
            try {
                res.json({ msg: 'currentuser called'})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      authToken: async (req,res) => {
            try {
                res.json({ msg: 'auth token called'})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      }
}

module.exports = authController