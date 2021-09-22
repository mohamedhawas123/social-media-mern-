const Mongoose  = require("mongoose");
const bcrypt = require ('bcrypt')

const userSchame = Mongoose.Schema({
    name: {
        type:String,
        required: true 
    },
    email :{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true

    },
    isAdmin:{
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})


userSchame.methods.matchPassword =async function (enterPassword)  {

    return await bcrypt.compare(enterPassword, this.password)

}

userSchame.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


const userModel = Mongoose.model("User", userSchame)


module.exports = userModel