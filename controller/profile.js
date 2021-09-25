const asyncHandler = require('express-async-handler')
const Profile=  require('../models/profile')

const getProfile = asyncHandler(async(req, res) => {
    try{
        const profile = await Profile.findById({user: req.user.id}).populate('user', ['name', 'avater'])
        if(!profile) {
            return res.status(404)
        }
    }catch(e) {
        res.status(500).send("Error at Server")
    }
})