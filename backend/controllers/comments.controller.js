import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiPostComment(req, res, next) {
        try{
            const schoolName = req.body.school_name
            const comment = req.body.text 
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id 
            }
            const date = new Date()

            const ReviewResponse = await CommentsDAO.addComment(
                schoolName,
                userInfo,
                comment,
                date,
            )
            return res.json( { status: "success "})
        } catch(e){
            res.status(500).json({ error: e.message })
        }
    }
    
    static async apiUpdateComment(req, res, next) {
        try {
            const commentId = req.body.comment_id
            const text = req.body.text
            const date = new Date() 

            const ReviewResponse = await CommentsDAO.updateComment(
                commentId, 
                req.body.user_id,
                text, 
                date, 
            )

            var { error } = ReviewResponse
            if (error) {
                return res.status(400).json({ error })
            }

            if (ReviewResponse.modifiedCount == 0) {
                throw new Error(
                    "unable to update review - user may not be original poster"
                )
            }

            return res.json( { status: "success "})
        } catch(e) {
            return res.status(500).json( { error: e.message })
        }
    }

    static async apiDeleteComment(req, res, next) {
        // check that the user id is the same person who wrote the review 
        try{
            const commentId = req.query.id
            const userId = req.body.user_id // TODO: Need to replace this to query for proper application
            console.log(commentId)

            const CommentResponse = await CommentsDAO.deleteComment (
                commentId,
                userId, 
            )
            return res.json({ status: "success" })
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }
}