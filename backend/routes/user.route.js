import express from "express"
import User from "../models/user.js"
import UserCtrl from "../controllers/user.controller.js"

const router = express.Router()

// TO DO: register and login functions 
router.route('/signup').post(UserCtrl.apiRegisterUser)
router.route('/login').post(UserCtrl.apiLoginUser)


export default router