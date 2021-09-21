import Mongoose  from "mongoose";


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
        type: String,
        required: true
    }
}, {
    timestamps: true
})


userSchame.methods.matchPassword =async function (password) => {

}


const userModel = Mongoose.model("User", userSchame)