import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiPostComment(req, res, next) {
        try{
            const schoolId = req.body.school_id
            const review = req.body.text 
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id 
            }
            const date = new Date()

            const ReviewResponse = await CommentsDAO.addComment(
                schoolId,
                userInfo,
                review,
                date,
            )
            res.json( { status: "success "})
        } catch(e){
            res.status(500).json({ error: e.message })
        }
    }
    
    static async apiUpdateComment(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date() 

            const ReviewResponse = await CommentsDAO.updateComment(
                reviewId, 
                req.body.user_id,
                text, 
                date, 
            )

            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ReviewResponse.modifiedCount == 0) {
                throw new Error(
                    "unable to update review - user may not be original poster"
                )
            }

            res.json( { status: "success "})
        } catch(e) {
            res.status(500).json( { error: e.message })
        }
    }

    static async apiDeleteComment(req, res, next) {
        // check that the user id is the same person who wrote the review 
        try{
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)

            const reviewResponse = await CommentsDAO.deleteComment (
                reviewId,
                userId, 
            )
            res.json({ status: "success" })
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }
}