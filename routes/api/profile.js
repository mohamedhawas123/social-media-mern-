

const express = require('express')
const protect = require('../../middleware/auth')
const Profile = require('../../controller/profile')

const app = express()

const router = express.Router()

router.route("/me").get(protect,Profile.getProfile)

router.route("/").post(protect, Profile.postProfile)
router.route('/profiles').get(protect, Profile.getProfiles)
router.route("/user/:user_id").get(Profile.getProfilebyid)
router.route("/user/:user_id/delete").delete(protect, Profile.deleteProfile )
router.route("/user/addExperience").put(protect, Profile.AddExperience)
router.route("/user/experice/:experice_id/delete").delete(protect, Profile.deleteExperience)
router.route("/user/addeducation").put(protect, Profile.AddEducation)
router.route("/user/education/:education_id/delete").delete(protect, Profile.deleteeducation)



module.exports = router