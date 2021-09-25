const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const token = require('../utiltie/token')



const userAuth = asyncHandler(async(req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.json(user)
    }catch(e) {
        console.log(e.message)
        res.status(500).send("Server Error")
    }
})

module.exports = userAuth