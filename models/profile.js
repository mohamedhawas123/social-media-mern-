const mongoose = require('mongoose')



const profileScame = mongoose.Schema({

    user: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company:{
        type: String,

    },
    website:{
        type: String
    },
    location:{
        type: String 
    },
    status: {
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername:{
        type:String
    },
    experience:
    [
        {
            title:{
                type:String,
                required: true
            },
            company:{
                type:String,
                required:true
            },
            location: {
                type:String,

            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            descr:{
                type: String

            }
    }
],

education:
    [
        {
            school:{
                type:String,
                required: true
            },
            degree:{
                type:String,
                required:true
            },
            fieldOfStudey: {
                type:String,
                required: true

            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            descr:{
                type: String

            }
    }
],

social:
    
        {
            youtube:{
                type:String,
                
            },

            twitter:{
                type:String,
                
            },


            facebook:{
                type:String,
                
            },


            linkedin:{
                type:String,
                
            },
            instgram:{
                type:String,
                
            },
    }
,




})


const Profile = mongoose.model("Profile",profileScame )


module.exports= Profile