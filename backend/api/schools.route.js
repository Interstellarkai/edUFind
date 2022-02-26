import express from "express" 
import SchoolsCtrl from "./schools.controller.js"
import CommentsCtrl from "./comments.controller.js"

const router = express.Router() // get access to the express router 

// Routes for getting general school information
router.route("/").get(SchoolsCtrl.apiGetSchools) // List all schools 
router.route("/id/:id").get(SchoolsCtrl.apiGetSchoolById) // List a specific school with comments

// JSON object of 'Keys' for drop-down menu
router.route("/zone_code").get(SchoolsCtrl.apiGetSchoolZoneCode) // Filter by NSEW 
router.route("/mainlevel_code").get(SchoolsCtrl.apiGetMainLevelCode) // Filter by level of education 
router.route("/gifted_ind").get(SchoolsCtrl.apiGetGiftedInd) // Filter by gifted programme 
router.route("/type_code").get(SchoolsCtrl.apiGetTypeCode) // Filter by Type Code
router.route("/nature_code").get(SchoolsCtrl.apiGetNatureCode) // Filter by Nature Code 

// Routes for commenting function 
router
    .route("/comment")
    .post(CommentsCtrl.apiPostComment)
    .put(CommentsCtrl.apiUpdateComment)
    .delete(CommentsCtrl.apiDeleteComment)

export default router
