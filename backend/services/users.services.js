import UserAuthDAO from "../dao/userAuthDAO.js";

// TODO: Token may be needed; Encryption may be added

export default class UserSevices {
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
		// const existingUser = await UserAuthDAO.GetUserByEmail(email.trim());
		const existingUser = await UserAuthDAO.GetUserByEmail(email);

		if (existingUser) {
			console.error(`An account with ${email} has already been created`);
			return {
				success: false,
				errorType: "RegisterAccountExist",
				message: `An account with ${email} has already been created`,
			};
		}

		let newUser = null;
		try {
			// newUser = await UserAuthDAO.CreateUser(email.trim(), username, password, gender, region, mtl, edulevel, interest);
			newUser = await UserAuthDAO.CreateUser(
				username,
				email,
				password,
				gender,
				region,
				mtl,
				edulevel,
				interest
			);
			return { success: true, message: "Success" };
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

		if (password != user.password) {
			console.error(`Failed login for account ${email}`);
			return {
				success: false,
				errorType: "LoginWrongPassword",
				message: "Invalid Login: Wrong password",
			};
		}
		// const accessToken = jwt.sign(user, process.env.JWT_SECRET)
		return { user, success: true, message: "Successfully logged in" };
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
		const {_id, ...others} = user
		return { _id, success: true, message: "Successfully logged in" };
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
			await user.save();
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
}
