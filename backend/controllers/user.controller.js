// TO DO Edit User Details
import UserServices from "../services/users.services.js";
import UserAuthDAO from "../dao/userAuthDAO.js";
// import { Request, Response } from 'express'

export default class UserController {
  static async registerUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    const region = req.body.region;
    const mtl = req.body.motherTongueLanguage;
    const eduLevel = req.body.educationLevel;
    const interests = req.body.ccaInterests;

    // Compulsory fields are not completed
    if (!username || !email || !password) {
      // return res.json({ error: "Add all data" })
      return res.json({
        success: false,
        errorType: "RegisterFieldsEmpty",
        message:
          "Compulsory fields (Username, Email, Password) are not completed",
      });
    }

    // Check validity of email
    const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (!email.match(emailRegex)) {
      console.error(`Invalid email: ${email}`);
      return res.json({
        success: false,
        errorType: "RegisterEmailRegex",
        message: "Email must be in name@email.com format",
      });
    } else if (email.length > 300) {
      console.error(`Invalid email: ${email}`);
      return res.json({
        success: false,
        errorType: "RegisterEmailLength",
        message: "Email is too long",
      });
    }

    // Check length of password
    if (password.length < 6 || password.lenth > 50) {
      console.error(`Invalid password length: ${password}`);
      return res.json({
        success: false,
        errorType: "RegisterPasswordLength",
        message: "Password should be within length of 6 - 50.",
      });
    }
    try {
      const status = await UserServices.Register(
        username,
        email,
        password,
        gender,
        region,
        mtl,
        eduLevel,
        interests,
        req,
        res,
        next
      );
      return res.json(status);
    } catch (err) {
      console.error(`AuthController: Register: ${err}`);
      return res.json({
        success: false,
        errorType: "RegisterCatchBlock",
        message: `An error occured while trying to create account ${err}`,
      });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (!email.match(emailRegex)) {
      console.error(`AuthController: Login: Invalid email string: ${email}`);
      return res.json({
        success: false,
        errorType: "LoginEmailRegex",
        message: "Email must be in name@email.com format",
      });
    } else if (email.length > 300) {
      console.error(`AuthController: Login: Invalid email string: ${email}`);
      return res.json({
        success: false,
        errorType: "LoginEmailLength",
        message: "Email is too long",
      });
    }

    if (password.length < 6 || password.length > 50) {
      console.error(`AuthController: Login: Invalid password string: ${email}`);
      return res.json({
        success: false,
        errorType: "LoginPasswordLength",
        message: "Password should be within length of 6 - 50.",
      });
    }

    try {
      const result = await UserServices.Login(email, password);
      return res.json(result);
    } catch (err) {
      return res.json({
        success: false,
        errorType: "LoginCatchBlock",
        message: `${err}`,
      });
    }
  }

  static async userLogout(req, res) {
    const userID = req.params.user;
    try {
      const result = await UserServices.Logout(userID);
      return res.json(result);
    } catch (err) {
      return res.json({
        success: false,
        errorType: "LogoutCatchBlock",
        message: `${err}`,
      });
    }
  }

  static async editAccountDetails(req, res) {
    try {
      const userId = req.body.userId;
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const gender = req.body.gender;
      const region = req.body.region;
      const mtl = req.body.motherTongueLanguage;
      const eduLevel = req.body.educationLevel;
      const interests = req.body.ccaInterests;

      const ReviewResponse = await UserAuthDAO.editUser(
        userId,
        username,
        email,
        password,
        gender,
        region,
        mtl,
        eduLevel,
        interests
      );
      var { error } = ReviewResponse;
      if (error) {
        return res.json({
          success: false,
          errorType: "EditCatchBlock",
          message: `${error}`,
        });
      }

      if (ReviewResponse.modifiedCount == 0) {
        return res.json({
          success: false,
          errorType: "EditNoChange",
          message: "Unable to edit account details",
        });
      }

      return res.json({
        success: true,
        message: "Successfully edited account",
      });
    } catch (e) {
      return res.json({
        success: false,
        errorType: "EditCatchBlock",
        message: `${err}`,
      });
    }
  }
}
