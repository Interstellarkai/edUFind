import UserAuthDAO from "../dao/userAuthDAO.js";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || null;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || null;

// TODO: Token may be needed; Encryption may be added

export default class UserSevices {
	static async GenerateGeneralJWTToken(userID) {
		if (!ACCESS_TOKEN_SECRET) {
			console.error(
				"AuthService: GenerateGeneralJWTToken: No JWT Secret"
			);
			throw new Error("An error occured while trying to generate token");
		}

		try {
			// const token = jwt.sign({ userID }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
			const token = jwt.sign({ userID }, ACCESS_TOKEN_SECRET);
			console.log(token);
			return token;
		} catch (err) {
			console.error(
				"AuthService: GenerateGeneralJWTToken: Failed to sign JWT Token"
			);
			throw new Error("An error occured while trying to generate token");
		}
	}

	// static async GenerateRefreshJWTToken(userID) {
	// 	if (!REFRESH_TOKEN_SECRET) {
	// 		console.error(
	// 			"AuthService: GenerateRefreshJWTToken: No JWT Secret"
	// 		);
	// 		throw new Error(
	// 			"An error occured while trying to generate refresh token"
	// 		);
	// 	}

	// 	try {
	// 		const token = jwt.sign(
	// 			{ userID, generatedAt: Date.now() },
	// 			ACCESS_TOKEN_SECRET,
	// 			{ expiresIn: "1h" }
	// 		);
	// 		return token;
	// 	} catch (err) {
	// 		console.error(
	// 			"AuthService: GenerateRefreshJWTToken: Failed to sign refresh JWT Token"
	// 		);
	// 		throw new Error(
	// 			"An error occured while trying to generate refresh token"
	// 		);
	// 	}
	// }

	static async Register(
		username,
		email,
		password,
		gender,
		region,
		mtl,
		edulevel,
		interest
	) {
		const existingUser = await UserAuthDAO.GetUserByEmail(email);

		if (existingUser) {
			console.error(`An account with ${email} has already been created`);
			return {
				success: false,
				errorType: "RegisterAccountExist",
				message: `An account with ${email} has already been created`,
			};
		}

		// Hash password
		let hashedPassword = null;
		try {
			hashedPassword = bcrypt.hashSync(password, 10);
		} catch (err) {
			console.log(err);
			console.error(
				`AuthService: Register: An error occured while trying to hash password for ${email}`
			);
			throw new Error(
				"An error occured while trying to register account"
			);
		}

		let newUser = null;
		try {
			// newUser = await UserAuthDAO.CreateUser(email.trim(), username, password, gender, region, mtl, edulevel, interest);
			newUser = await UserAuthDAO.CreateUser(
				username,
				email,
				hashedPassword, // Encrypted password
				gender,
				region,
				mtl,
				edulevel,
				interest
			);
			// return { success: true, message: "Success" };
		} catch (err) {
			console.error(
				`An error occured while trying to create account ${err}`
			);
			return {
				success: false,
				errorType: "RegisterCatchBlock",
				message: `An error occured while trying to create account ${err}`,
			};
		}

		// Generate tokens
		try {
			const user = await UserAuthDAO.GetUserByEmail(email)
			const { _id, ...others } = user;
			const generalToken = this.GenerateGeneralJWTToken(_id.toString());
			console.log(generalToken);
			// const refreshToken = this.GenerateRefreshJWTToken(newUser._id);

			// await RefreshTokenRepo.CreateRefreshToken(
			// 	newUser._id,
			// 	refreshToken
			// );

			// return { token: generalToken, refreshToken };
			return { token: generalToken};
		} catch (err) {
			throw new Error(
				"An error occured while generating authorization tokens"
			);
		}
	}

	static async Login(email, password) {
		const user = await UserAuthDAO.GetUserByEmail(email);
		// If user does not exist
		if (!user) {
			console.error(`User Account does not exist ${email}`);
			return {
				success: false,
				errorType: "LoginNoSuchAccount",
				message: `Invalid Login: User Account does not exist ${email}`,
			};
		}

		// if (password != user.password) {
		if (!bcrypt.compareSync(password, user.password)) {
			console.error(`Failed login for account ${email}`);
			return {
				success: false,
				errorType: "LoginWrongPassword",
				message: "Invalid Login: Wrong password",
				token: "",
				refreshToken: "",
			};
		}

		try {
			const generalToken = this.GenerateGeneralJWTToken(user._id);
			// const refreshToken = this.GenerateRefreshJWTToken(user._id);
			// await RefreshTokenRepo.CreateRefreshToken(user._id, refreshToken);
			return {
				user,
				success: true,
				message: "Successfully logged in",
				// token: generalToken,
				// refreshToken,
				token: generalToken,
			};
		} catch {
			console.error(
				`AuthService: Login: Error generating tokens for user ${email}`
			);
			throw new Error("An error occured while logging in");
		}
	}

	static async LoginGetID(email, password) {
		const user = await UserAuthDAO.GetUserByEmail(email);
		// If user does not exist
		if (!user) {
			console.error(`User Account does not exist ${email}`);
			return {
				success: false,
				errorType: "LoginNoSuchAccount",
				message: `Invalid Login: User Account does not exist ${email}`,
			};
		}

		if (password != user.password) {
			console.error(`Failed login for account ${email}`);
			return {
				success: false,
				errorType: "LoginWrongPassword",
				message: "Invalid Login: Wrong password",
			};
		}
		// TODO:
		const { _id, ...others } = user;
		return { _id, success: true, message: "Successfully logged in" };
	}

	static async RefreshToken(userID) {
		if (!userID) {
			throw new Error("No user ID");
		}

		try {
			const newToken = GenerateGeneralJWTToken(userID);
			return { token: newToken };
		} catch (err) {
			throw new Error(err.message);
		}
	}

	static async SetUserExpoToken(userID, expoToken) {
		if (!userID) {
			throw new Error("No user ID");
		}

		const user = await UserAuthDAO.GetUserByID(userID)
		if (!user) {
			throw new Error(`User of ID ${userID} not found`);
		}

		user.expoToken = expoToken;
		await user.save();
		return { message: "Successfully set expo token for user" };
	}

	static async Logout(userID) {
		if (!userID) {
			console.error("No user ID");
			return {
				success: false,
				errorType: "LogoutIdEmpty",
				message: "user ID is empty",
			};
		}

		const user = await UserAuthDAO.GetUserByID(userID);
		if (!user) {
			console.error(`User of ID ${userID} not found`);
			return {
				success: false,
				errorType: "LogoutNoSuchAccount",
				message: `User of ID ${userID} not found`,
			};
		}

		try {
			user.expoToken = null;
			await user.save();
			await RefreshTokenRepo.DeleteRefreshTokensForUser(userID);
		} catch (err) {
			console.error(`AuthService: Logout: ${err}`);
			return {
				success: false,
				errorType: "LogoutCatchBlock",
				message: `${err}`,
			};
		}
		return { success: true, message: "Successfully logged out" };
	}

	// const AuthService = {
	// 	Register,
	// 	Login,
	// 	RefreshToken,
	// 	SetUserExpoToken,
	// 	Logout,
	// }

	// export { AuthService as default };
}
