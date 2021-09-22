

const express = require('express')
const RegisterUser = require('../../controller/auth')

const app = express()

const router = express.Router()

router.route("/register").post(RegisterUser)


module.exports = router