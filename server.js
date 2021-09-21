const express = require('express')
const mongoDb = require('./config/db')
const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/auth')
const profileRoutes = require('./routes/api/profile')
const postRoutes = require('./routes/api/post')


const app = express()

mongoDb()

app.use("/",usersRoutes)
app.use("/profile",profileRoutes)
app.use("/auth",authRoutes)
app.use("/post",postRoutes)



const PORT = 3000 || process.env.PORT

app.listen(PORT, console.log("i am running"))