

const express = require('express')


const app = express()

const router = express.Router()

router.route("/").get((req, res)=> {
    res.send("post running")
})


module.exports = router