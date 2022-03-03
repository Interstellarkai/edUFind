// TO DO: Shortlist Functions 

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
import Shortlist from "../models/shortlist.js"

let shortlist

export default class ShortlistDAO {
  static async injectDB(conn) {
    if (shortlist) {
      return
    }
    try {
      shortlist = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("shortlist")
    } catch (e) {
      console.error(`Unable to establish collection handles in commentDAO: ${e}`)
    }
  }

  static async addToShortlist() {
    // TO DO
  }

  static async getShortlistedById() {
    // TO DO
  }

  static async deleteShortlistedById(){
    // TO DO 
  }
}