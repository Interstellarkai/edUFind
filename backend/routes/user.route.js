import express from "express"
import UserCtrl from "../controllers/user.controller.js"

const router = express.Router()

router.route('/signup').post(UserCtrl.registerUser)
router.route('/login').post(UserCtrl.userLogin)
router.route('/editAccountDetails').post(UserCtrl.editAccountDetails)
router.route('/loginID').post(UserCtrl.userLoginGetID)

export default router