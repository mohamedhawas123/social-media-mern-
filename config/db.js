const mongoose =  require('mongoose')
const config = require('config')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://new_user:panzer123@mern.p3aer.mongodb.net/test?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser:true,
        })

        console.log(`datebase is running at ${connect.connection.host}`)
    }catch(e) {
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB