import express from "express"
import User from "../models/user.js"
import UserCtrl from "../controllers/user.controller.js"

const router = express.Router()

router.route('/').post(UserCtrl.apiRegisterUser)


export default router