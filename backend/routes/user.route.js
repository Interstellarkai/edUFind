import express from "express"
import UserCtrl from "../controllers/user.controller.js"
import UserServices from "../services/users.services.js"

// import VerifyJWTRefreshToken from '../services/refreshJWT.js';
// import VerifyJWTToken from '../services/verifyJWT.js';

const router = express.Router()

router.route('/signup').post(UserCtrl.registerUser)
router.route('/login').post(UserCtrl.userLogin)
router.route('/editAccountDetails').post(UserCtrl.editAccountDetails)
router.route('/loginID').post(UserCtrl.userLoginGetID)

// router.post('/refresh', VerifyJWTRefreshToken, UserCtrl.Refresh);
// router.post('/expoToken', VerifyJWTToken, UserCtrl.SetExpoToken);
// router.post('/logout', VerifyJWTToken, UserCtrl.userLogin);

export default router