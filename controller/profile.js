const asyncHandler = require('express-async-handler')
const Profile=  require('../models/profile')
const {check, validationResult} = require('express-validator')



const getProfile = asyncHandler(async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avater'])
        if(!profile) {
            return res.status(400).json({msg: "there's no profile for this user"})
        }
        res.json(profile)
    }catch(e) {
        console.log(e)
        res.status(500).send("Error at Server")
    }
})

const postProfile = asyncHandler(async(req, res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()})
    // }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkkedin
    } = req.body

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills) {
        profileFields.skills =skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube
    if(twitter) profileFields.social.twitter = twitter
    if(facebook) profileFields.social.facebook = facebook
    if(linkkedin) profileFields.social.linkkedin = linkkedin
    if(linkkedin) profileFields.social.linkkedin = linkkedin

    try {

        let profile = await Profile.findOne({user: req.user.id});
        console.log(profile)
       
        if(profile) {
            profile = Profile.findOneAndUpdate(
                {user:req.user.id}, 
                {$set: profileFields}, 
                {new: true}
                );
            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save()
        res.json(profile)

    }catch(e) {
        console.log(e.message)
        res.status(500).send("Server Error")
    }

})


const getProfiles = asyncHandler(async(req, res) => {
    try {
        const profiles = await Profile.find({}).populate('user', ['name', 'avatar']);
        res.json(profiles)
    }catch(e) {
        console.log(e)
        res.status(5000).send("Dunno")
    }
})


const getProfilebyid = asyncHandler(async(req, res) => {
    try {
        const profile =  await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if(!profile) {
            res.status(400).json({msg: "theres no profile for this user"})
        }

        res.json(profile)
    }catch(e) {
        console.log(e)
        if(e.kind == 'ObjectedId') {
            res.status(400).json({msg: "theres no profile for this user"})

        }
    }
})

module.exports = {
    getProfile,
    postProfile,
    getProfiles,
    getProfilebyid

}