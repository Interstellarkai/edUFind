import express from "express"
import ShortlistCtrl from "../controllers/shortlist.controller.js"

const router = express.Router()

router.route('/:id').post(ShortlistCtrl.addToShortlist)
router.route('/:id/viewShortlist').get(ShortlistCtrl.getShortlisted)
router.route('/:id/editShortlist').put(ShortlistCtrl.editShortlist)
router.route('/:id/deleteShortlisted').delete(ShortlistCtrl.removeShortlistItem)

export default router