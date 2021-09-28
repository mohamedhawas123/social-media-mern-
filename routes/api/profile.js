

const express = require('express')
const protect = require('../../middleware/auth')
const Profile = require('../../controller/profile')

const app = express()

const router = express.Router()

router.route("/me").get(protect,Profile.getProfile)

router.route("/").post(protect, Profile.postProfile)
router.route('/profiles').get(protect, Profile.getProfiles)
router.route("/user/:user_id").get(Profile.getProfilebyid)


module.exports = router