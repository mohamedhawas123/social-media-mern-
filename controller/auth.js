const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const token = require('../utiltie/token')


const authlogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: token(user._id) 
        })
    } else {
        res.status(401)
        throw new Error("InValid email or Password")
    
    }
})

const RegisterUser = async (req, res)  =>  {
    const {name, email, password} = req.body
    const user = await userModel.findOne({email})
    if(user) {
        res.json({'error': 'user aleardy exist'})
    }

    const newUser= await userModel.create({
        name, email, password
    })

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email:newUser.email,
            isAdmin: newUser.isAdmin,
            token: token(newUser._id)
            
        })
    }else {
        res.status(400)
        throw new Error("something went wrong")
    }
}

module.exports = {
    RegisterUser,
    authlogin

}