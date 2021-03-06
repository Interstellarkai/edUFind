import express from "express";
import ShortlistCtrl from "../controllers/shortlist.controller.js";
import VerifyJWTToken from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/", VerifyJWTToken, ShortlistCtrl.addShortlist);
router.get("/:id/viewShortlist", VerifyJWTToken, ShortlistCtrl.getShortlisted);
router.put("/:id/editShortlist", VerifyJWTToken, ShortlistCtrl.editShortlist);
router.delete("/:id/deleteShortlisted", VerifyJWTToken, ShortlistCtrl.removeShortlistItem);

export default router;
