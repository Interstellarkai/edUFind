import express from "express"
import ShortlistCtrl from "../controllers/shortlist.controller.js"

const router = express.Router()

router.route('/').put(ShortlistCtrl.addToShortlist)
router.route('/viewShortlist').get(ShortlistCtrl.getShortlist)
router.route('/deleteShortlisted').delete(ShortlistCtrl.removeFromShortlist)

export default router