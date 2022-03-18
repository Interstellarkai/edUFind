import express from "express";
import ShortlistCtrl from "../controllers/shortlist.controller.js";
import VerifyJWTToken from "../middleware/verifyJWT.js";

const router = express.Router();

<<<<<<< HEAD
router.post('/', VerifyJWTToken, ShortlistCtrl.addShortlist)
router.get('/:id/viewShortlist', VerifyJWTToken, ShortlistCtrl.getShortlisted)
router.put('/:id/editShortlist', VerifyJWTToken, ShortlistCtrl.editShortlist)
router.delete('/:id/deleteShortlisted', VerifyJWTToken, ShortlistCtrl.removeShortlistItem)
=======
router.post("/", VerifyJWTToken, ShortlistCtrl.addShortlist);
router.get("/:id/viewShortlist", VerifyJWTToken, ShortlistCtrl.getShortlisted);
router.put("/:id/editShortlist", VerifyJWTToken, ShortlistCtrl.editShortlist);
router.delete("/:id/deleteShortlisted", VerifyJWTToken, ShortlistCtrl.removeShortlistItem);
>>>>>>> b962e64ab5c282634f118a687bcb3e9d8a210f91

export default router;
