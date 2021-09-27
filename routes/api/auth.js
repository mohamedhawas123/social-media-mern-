
const express = require('express')
const {check, validationResult} = require('express-validator')
const protect = require('../../middleware/auth')
const userAuth = require('../../controller/users')
const userAuthen = require('../../controller/auth')

const app = express()

const router = express.Router()


// [
//     check('name', 'Name is Required').not().isEmpty(),
//     check('email', 'please include a valid email').isEmail(),
//     check('password', 'please entera password with 6 more character').isLength({min: 6})
// ] ,

// const errors =  validationResult(req)
//     console.log(errors)
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }
// router.route("/").post(userAuth)

router.route('/login').post(userAuthen.authlogin)
router.route('/register').post(userAuthen.RegisterUser)


module.exports = router