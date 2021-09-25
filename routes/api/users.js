const express = require('express')
const user = require('../../controller/auth')

const app = express()

const router = express.Router()

router.route("/register").post(user.RegisterUser)
router.route("/login").post(user.authlogin)


module.exports = router