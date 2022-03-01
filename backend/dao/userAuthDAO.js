import User from "../models/user.js"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let accounts

export default class UserAuthDAO {
    static async injectDB(conn) {
        // if comments exist
        if (accounts) {
            return
        }
        try {
            accounts = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("accounts")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async CreateUser(username, email, password, gender, region, mtl, eduLevel, interest){
        try{
            // const normalizedEmail = email.trim().toLowerCase();
            const newUser = {
                username: username,
                email: email,
                password: password,
                gender: gender,
                region: region,
                motherTongueLanguage: mtl,
                educationLevel: eduLevel,
                ccaInterests: interest,
            }
            return await accounts.insertOne(newUser)
        } catch (e) {
            console.error(`Unable to create account: ${e}`)
            return { success: false, message: `Unable to create account: ${e}` }
        }
    }
    
    static async GetUserByEmail(email){
        try{
            // const normalizedEmail = email.trim().toLowerCase();
            const user = await accounts.findOne({ email: email })
            return user
        } catch (e) {
            console.error(`Unable to get user by email: ${e}`)
            return null
        }
    }
    
    static async GetUserByID(userID){
        try {
            const user = await accounts.findById(userID);
            return user;
        } catch (e) {
            console.error(`Unable to get user by id: ${e}`)
            return { success: false, message: `Unable to get user by id: ${e}` }
        }
    }
    
    static async editUser(userId, username, email, password, gender, region, mtl, eduLevel, interest){
        try{
            const editUser = await accounts.updateOne(
                { _id: ObjectId(userId) }, 
                { $set: { 
                    username: username,
                    email: email,
                    password: password,
                    gender: gender,
                    region: region,
                    motherTongueLanguage: mtl,
                    educationLevel: eduLevel,
                    ccaInterests: interest, 
                }}
            )
            return editUser
        } catch (e) {
            console.error(`Unable to update account: ${e}`)
            return { error: e }
        }
    }
}

