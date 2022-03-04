import express from "express"
import ShortlistCtrl from "../controllers/shortlist.controller.js"

const router = express.Router()

router.route('/').post(ShortlistCtrl.addShortlist)
router.route('/id/:id/editShortlist').put(ShortlistCtrl.editShortlist)
router.route('/id/:id/deleteShortlisted').delete(ShortlistCtrl.removeShortlistItem) 
router.route('/id/:id/viewShortlist').get(ShortlistCtrl.getShortlisted) 

export default router