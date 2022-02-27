// TO DO Register User, Edit User Details
import User from "../models/user.js"

let account

export default class UserController {
    // Account DB 
    static async injectDB(conn) {
        if (account) {
            return
        }
        try {
            account = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("accounts")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async apiRegisterUser(req, res, next) {

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const gender = req.body.gender
        const region = req.body.region
        const motherTongueLanguage = req.body.motherTongueLanguage
        const educationLevel = req.body.educationLevel
        const ccaInterests = req.body.ccaInterests
        // Compulsory fields not completed
        if (!username || !email || !password) {
            return res.status(422).json({ error: "Add all data" })
        }

        // Check for unique email

    }
}