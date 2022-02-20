import express from "express" 
import SchoolsCtrl from "./schools.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router() // get access to the express router 

router.route("/").get(SchoolsCtrl.apiGetSchools) // get the Return at the route from the SchoolsCtrl file 
router.route("/id/:id").get(SchoolsCtrl.apiGetSchoolById) // get specific school with specific id
router.route("/zonecode").get(SchoolsCtrl.apiGetSchoolZoneCode) // allow the user to click from a dropdown. this populates the dropdown

// route to put the new review 
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router
