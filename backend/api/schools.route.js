import express from "express" 
import SchoolsCtrl from "./schools.controller.js"
import CommentsCtrl from "./comments.controller.js"
import CCACtrl from "./cca.controller.js"

const router = express.Router() // get access to the express router 

// Routes for getting general school information
router.route("/general").get(SchoolsCtrl.apiGetSchools) // List all schools 
router.route("/general/id/:id").get(SchoolsCtrl.apiGetSchoolById) // List a specific school with comments
router.route("/general/zone_code").get(SchoolsCtrl.apiGetSchoolZoneCode) // Returns 'Keys' for drop-down menu
router.route("/general/mainlevel_code").get(SchoolsCtrl.apiGetMainLevelCode) // Returns 'Keys' for drop-down menu
router.route("/general/gifted_ind").get(SchoolsCtrl.apiGetGiftedInd) // Returns 'Keys' for drop-down menu
router.route("/general/type_code").get(SchoolsCtrl.apiGetTypeCode) // Returns 'Keys' for drop-down menu
router.route("/general/nature_code").get(SchoolsCtrl.apiGetNatureCode) // Returns 'Keys' for drop-down menu

// Routes for getting CCA information
router.route("/cca").get(CCACtrl.apiGetCCAs) // List all CCA
router.route("/cca/cca_generic_name").get(CCACtrl.apiGetCcaGenericName) // Returns 'Keys' for drop-down menu
router.route("/cca/cca_grouping_desc").get(CCACtrl.apiGetCcaGroupingDesc) // Returns 'Keys' for drop-down menu

// Routes for commenting function 
router
    .route("/comment")
    .post(CommentsCtrl.apiPostComment)
    .put(CommentsCtrl.apiUpdateComment)
    .delete(CommentsCtrl.apiDeleteComment)

export default router
