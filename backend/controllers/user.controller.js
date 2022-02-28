// TO DO Edit User Details
import UserServices from "../services/users.services.js"
import UserAuthDAO from "../dao/userAuthDAO.js"
// import { Request, Response } from 'express'

export default class UserController {
    static async registerUser(req, res, next) {
        const username = req.body.username 
        const password = req.body.password
        const email = req.body.email
        const gender = req.body.gender
        const region = req.body.region
        const mtl = req.body.motherTongueLanguage
        const eduLevel = req.body.educationLevel
        const interests = req.body.ccaInterests

        // Compulsory fields not completed
        if (!username || !email || !password) {
            return res.status(422).json({ error: "Add all data" })
        }

        // Check validity of email 
        const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+"
        if (!email.match(emailRegex)) {
            console.error(`Invalid email: ${email}`)
            return res.status(500).json({ message: 'Email must be in name@email.com format' });
        }else if (email.length > 300){
            console.error(`Invalid email: ${email}`)
            return res.status(500).json({ message: 'Email is too long' });
        }
        
        // // Check length of password
        if (password.length < 6 || password.lenth > 50){
            console.error(`Invalid password string: ${password}`)
            return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
        }
        try {
            console.log("STATUS NOW")
            const status = await UserServices.Register(username, email, password, gender, region, mtl, eduLevel, interests);
            console.log("STATUS NOW")
            console.log(status)
            res.json(status);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

    }

    static async userLogin(req, res){
        const { email, password } = req.body;

        const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
        if (!email.match(emailRegex)) {
            console.error(`AuthController: Login: Invalid email string: ${email}`)
            return res.status(500).json({ message: 'Email must be in name@email.com format' });
        }else if (email.length > 300){
            console.error(`AuthController: Login: Invalid email string: ${email}`)
            return res.status(500).json({ message: 'Email is too long' });
        }

        if (password.length < 6 || password.length > 50){
            console.error(`AuthController: Login: Invalid password string: ${email}`)
            return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
        }

        try {
            const result = await UserServices.Login(email, password);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    static async userLogout(req, res){
        const userID = req.params.user;
        try{
            const result = await UserServices.Logout(userID);
            res.json(result);
        } catch(err){
            res.status(500).json({ message: err.message });
        }
    }

    static async editAccountDetails(req, res){
        try {
            const userId = req.body.userId
            const username = req.body.username 
            const password = req.body.password
            const email = req.body.email
            const gender = req.body.gender
            const region = req.body.region
            const mtl = req.body.motherTongueLanguage
            const eduLevel = req.body.educationLevel
            const interests = req.body.ccaInterests
            console.log(userId, username)

            const ReviewResponse = await UserAuthDAO.editUser(userId, username, email, password, gender, region, mtl, eduLevel, interests)
            console.log(ReviewResponse)
            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ReviewResponse.modifiedCount == 0) {
                throw new Error(
                    "Unable to edit account details"
                )
            }

            res.json( { status: "success "})
        } catch(e) {
            res.status(500).json( { error: e.message })
        }
    }
}