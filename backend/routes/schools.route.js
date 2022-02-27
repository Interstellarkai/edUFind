import express from "express" 
import SchoolsCtrl from "../controllers/schools.controller.js"
import CommentsCtrl from "../controllers/comments.controller.js"
import CCACtrl from "../controllers/cca.controller.js"
import MOECtrl from "../controllers/moe.controller.js"
import ProgrammesCtrl from "../controllers/programmes.controller.js"
import SpecialNeedsCtrl from "../controllers/specialneeds.controller.js"
import SubjectsCtrl from "../controllers/subjects.controller.js"

const router = express.Router() // get access to the express router 

// Routes for getting general school information
router.route("/general").get(SchoolsCtrl.apiGetSchools) // List all schools 
router.route("/general/id/:id").get(SchoolsCtrl.apiGetSchoolById) // List a specific school with comments

router.route("/general/school_name").get(SchoolsCtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/general/zone_code").get(SchoolsCtrl.apiGetZoneCode) // Returns 'Keys' for drop-down menu
router.route("/general/mainlevel_code").get(SchoolsCtrl.apiGetMainLevelCode) // Returns 'Keys' for drop-down menu
router.route("/general/gifted_ind").get(SchoolsCtrl.apiGetGiftedInd) // Returns 'Keys' for drop-down menu
router.route("/general/type_code").get(SchoolsCtrl.apiGetTypeCode) // Returns 'Keys' for drop-down menu
router.route("/general/nature_code").get(SchoolsCtrl.apiGetNatureCode) // Returns 'Keys' for drop-down menu

// Routes for getting CCA information
router.route("/cca").get(CCACtrl.apiGetCCAs) // List all CCA
router.route("/cca/school_name").get(CCACtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/cca/cca_generic_name").get(CCACtrl.apiGetCcaGenericName) // Returns 'Keys' for drop-down menu
router.route("/cca/cca_grouping_desc").get(CCACtrl.apiGetCcaGroupingDesc) // Returns 'Keys' for drop-down menu

// Routes for getting MOE Programmes
router.route("/moe").get(MOECtrl.apiGetMOE) // List all MOE programmes
router.route("/moe/school_name").get(MOECtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/moe/moe_programme_desc").get(MOECtrl.apiGetMoeProgrammeDesc) // Returns 'Keys' for drop-down menu

// Routes for getting Schools Distinctive Programmes
router.route("/programmes").get(ProgrammesCtrl.apiGetProgrammes) // List all School Distinctive Programmes
router.route("/programmes/school_name").get(ProgrammesCtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/programmes/alp_domain").get(ProgrammesCtrl.apiGetProgrammesAlpDomain) // Returns 'Keys' for drop-down menu
router.route("/programmes/alp_title").get(ProgrammesCtrl.apiGetProgrammesAlpTitle) // Returns 'Keys' for drop-down menu
router.route("/programmes/llp_domain1").get(ProgrammesCtrl.apiGetProgrammesLlpDomain) // Returns 'Keys' for drop-down menu
router.route("/programmes/llp_title1").get(ProgrammesCtrl.apiGetProgrammesLlpTitle) // Returns 'Keys' for drop-down menu

// Routes for getting Special Needs
router.route("/specialneeds").get(SpecialNeedsCtrl.apiGetSpecialNeeds) // List all special needs
router.route("/specialneeds/school_name").get(SpecialNeedsCtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/zone_code").get(SpecialNeedsCtrl.apiGetZoneCode) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/barrier_free_facilities").get(SpecialNeedsCtrl.apiGetBarrierFreeFacilities) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/hearing_loss").get(SpecialNeedsCtrl.apiGetHearingLoss) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/visual_impairment").get(SpecialNeedsCtrl.apiGetVisualImpairment) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/option_code").get(SpecialNeedsCtrl.apiGetOptionCode) // Returns 'Keys' for drop-down menu
router.route("/specialneeds/aedlearningnbehavl_suppt").get(SpecialNeedsCtrl.apiGetAedLearningnBehavlSuppt) // Returns 'Keys' for drop-down menu

// Routes for getting Special Needs
router.route("/subjects").get(SubjectsCtrl.apiGetSubjects) // List all subjects offered
router.route("/subjects/school_name").get(SubjectsCtrl.apiGetSchoolName) // Returns 'Keys' for drop-down menu
router.route("/subjects/subject_desc").get(SubjectsCtrl.apiGetSubjectDesc) // Returns 'Keys' for drop-down menu

// Routes for commenting function 
router
    .route("/comment")
    .post(CommentsCtrl.apiPostComment)
    .put(CommentsCtrl.apiUpdateComment)
    .delete(CommentsCtrl.apiDeleteComment)

export default router
