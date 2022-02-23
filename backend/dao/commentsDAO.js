import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let comments

export default class CommentsDAO {
  static async injectDB(conn) {
      // if comments exist
    if (comments) {
      return
    }
    try {
      comments = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("comments")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addComment(schoolId, user, review, date) {
    try {
        // create review dp 
      const reviewDoc = { 
          name: user.name,
          user_id: user._id,
          date: date,
          text: review,
          school_id: schoolId, // creates a object id
        }
        return await comments.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateComment(reviewId, userId, text, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: ObjectId(reviewId)},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteComment(reviewId, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return { error: e }
    }
  }
}   