const asyncHandler = require('express-async-handler')
const Profile=  require('../models/profile')
const {check, validationResult} = require('express-validator')
const userModel = require('../models/userModel')
const request = require('request')



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


const deleteProfile = asyncHandler(async(req, res) => {
    try {
         await Profile.findByIdAndDelete({user: req.user.id})
         await userModel.findByIdAndDelete({_id: req.user.id})
        res.json({msg: 'User deleted'})


    }catch(e) {
        res.status(500).send("Server Error ")
    }
})


const AddExperience = asyncHandler(async(req, res) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        descr
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        descr
    }
    try {

        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)

    }catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


const deleteExperience = asyncHandler(async(req, res) => {
    try {
        
        const profile=  await Profile.findOne({user: req.user.id})

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experice_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()


    }catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


const AddEducation = asyncHandler(async(req, res) => {
    const {
        school,
        degree,
        fieldOfStudey,
        from,
        to,
        current,
        descr
    } = req.body

    const newExp = {
        school,
        degree,
        fieldOfStudey,
        from,
        to,
        current,
        descr
    }
    try {

        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newExp)
        await profile.save()
        res.json(profile)

    }catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


const deleteeducation = asyncHandler(async(req, res) => {
    try {
        
        const profile=  await Profile.findOne({user: req.user.id})

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()


    }catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


const gethubUsername = asyncHandler(async(req, res) => {
    const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
        sort=created:asc&client_id=cb3955a74352d0811ad1&client_secret=05efc9684bc09528451eebdb349f0c4096ba179a`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }

    };

    request(options, (error, response, body) => {
        if(error) console.error(error);

        if(response.statusCode !==200) {
            return res.status(404).json({msg: 'No Github profile found'})
        }

        res.json(JSON.parse(body))

    })
})


module.exports = {
    getProfile,
    postProfile,
    getProfiles,
    getProfilebyid,
    deleteProfile,
    AddExperience,
    deleteExperience,
    AddEducation,
    deleteeducation,
    gethubUsername

}