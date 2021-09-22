
const express = require('express')
const {check, validationResult} = require('express-validator')

const app = express()

const router = express.Router()

router.route("/").get( [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please entera password with 6 more character').isLength({min: 6})
] ,(req, res)=> {
    const errors =  validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send("user running")
})


module.exports = router