import express from "express"
import UserCtrl from "../controllers/user.controller.js"
// import UserServices from "../services/users.services.js"

import VerifyJWTRefreshToken from '../middleware/refreshJWT.js';
import VerifyJWTToken from '../middleware/verifyJWT.js';

const router = express.Router()

router.route('/signup').post(UserCtrl.registerUser)
router.route('/login').post(UserCtrl.userLogin)
router.post('/editAccountDetails', VerifyJWTToken, UserCtrl.editAccountDetails)
router.post('/loginID', VerifyJWTToken, UserCtrl.userLoginGetID)
router.post('/logout', VerifyJWTToken, UserCtrl.userLogout);

// Outdated work
// router.route('/editAccountDetails').post(UserCtrl.editAccountDetails)
// router.route('/loginID').post(UserCtrl.userLoginGetID)
// router.post('/refresh', VerifyJWTRefreshToken, UserCtrl.Refresh);
// router.post('/expoToken', VerifyJWTToken, UserCtrl.SetExpoToken);

export default router