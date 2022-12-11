const mongoose = require('mongoose')

const Schame = mongoose.Schema


const postScame = new Schame({


    user: {
        type: Schame.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: 'String',
        required: true
    },
    name: {
        type: String,

    },
    avatar: {
        type:String
    },
    likes : [
        {
            user: {
                type: Schame.Types.ObjectId,
                ref: 'user'
            },
            
        }
    ],

    comments: [
        {
            user: {
                type: Schame.Types.ObjectId,
                ref : 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String 
            },
            avata: {
                type: String 
            },
            date: {
                type: Date, 
                default: Date.now
            }
        }
    ],
    date: {
        type:Date,
        default: Date.now
    }

}


);

const Post = mongoose.model('Post', postScame)

module.exports = Post
