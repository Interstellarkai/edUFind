import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
import Comments from "../models/comments.js"

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
      console.error(`Unable to establish collection handles in commentDAO: ${e}`)
    }
  }

  static async addComment(schoolId, user, comment, date) {
    try {
        // create review dp 
      const reviewDoc = new Comments({ 
          name: user.name,
          user_id: user._id,
          date: date,
          text: comment,
          school_id: schoolId, // creates a object id 
        })
        return await comments.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateComment(commentId, userId, text, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: ObjectId(commentId)},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId(commentId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return { error: e }
    }
  }
}   