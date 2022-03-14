import express from "express"
import ShortlistCtrl from "../controllers/shortlist.controller.js"
import VerifyJWTToken from '../middleware/verifyJWT.js';

const router = express.Router()

<<<<<<< Updated upstream
router.route('/').post(ShortlistCtrl.addShortlist)
router.route('/id/:id/editShortlist').put(ShortlistCtrl.editShortlist)
router.route('/id/:id/deleteShortlisted').delete(ShortlistCtrl.removeShortlistItem) 
router.route('/id/:id/viewShortlist').get(ShortlistCtrl.getShortlisted) 
=======
router.post('/:id', VerifyJWTToken, ShortlistCtrl.addToShortlist)
router.get('/:id/viewShortlist', VerifyJWTToken, ShortlistCtrl.getShortlisted)
router.put('/:id/editShortlist', VerifyJWTToken, ShortlistCtrl.editShortlist)
router.delete('/:id/deleteShortlisted', VerifyJWTToken, ShortlistCtrl.removeShortlistItem)
>>>>>>> Stashed changes

export default router