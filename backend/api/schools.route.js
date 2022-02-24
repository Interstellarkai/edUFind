import express from "express" 
import SchoolsCtrl from "./schools.controller.js"
import CommentsCtrl from "./comments.controller.js"

const router = express.Router() // get access to the express router 

// Routes for getting general school information
router.route("/").get(SchoolsCtrl.apiGetSchools) 
router.route("/id/:id").get(SchoolsCtrl.apiGetSchoolById) 
router.route("/zonecode").get(SchoolsCtrl.apiGetSchoolZoneCode) 

// Routes for commenting function 
router
    .route("/comment")
    .post(CommentsCtrl.apiPostComment)
    .put(CommentsCtrl.apiUpdateComment)
    .delete(CommentsCtrl.apiDeleteComment)

export default router
