import mongodb from "mongodb";
import RefreshToken from "../models/refreshToken.js";
const ObjectId = mongodb.ObjectId;

let refresh_token;
export default class RefreshTokenRepo {
	static async injectDB(conn) {
		if (refresh_token) {
			return;
		}
		try {
			refresh_token = await conn
				.db(process.env.SCHOOLREVIEWS_NS)
				.collection("refresh_token");
		} catch (e) {
			console.error(
				`Unable to establish collection handles in refresh_tokenDAO: ${e}`
			);
		}
	}

	static async CreateRefreshToken(userID, token, refreshToken) {
		const expiry = new Date();
		expiry.setDate(expiry.getDate() + 7);
		try {
			var filter = { "user": ObjectId(userID) },
				update = {
					$set: {
						user: ObjectId(userID),
						token: token,
						refreshToken: refreshToken,
						generatedAt: new Date(),
						expiresAt: expiry,
					},
				},
				options = {
					upsert: true,
					new: true,
					setDefaultsOnInsert: true,
				};
			// Find the document
			await refresh_token.findOneAndUpdate(filter, update, options), function(error, result){};
		} catch (err) {
			console.error(
				`RefreshTokenRepo: CreateRefreshToken: An error occured while saving refresh token ${err}`
			);
			throw new Error("An error occured while saving refresh token");
		}
	}

	static async GetRefreshTokenByToken(token) {
		try {
			const refreshToken = await refresh_token.findOne({ token });
			return refreshToken;
		} catch (err) {
			console.error(
				`RefreshTokenRepo: GetRefreshTokenByToken: An error occured while retrieving token ${token}`
			);
			throw new Error("An error occured while retrieving refresh token");
		}
	}

	static async DeleteRefreshTokensForUser(userID) {
		try {
			await refresh_token.deleteOne({ user : ObjectId(userID) });
		} catch (err) {
			console.error(
				`RefreshTokenRepo: DeleteRefreshTokensForUser: An error occured while deleting token for ${userID}`
			);
			throw new Error("An error occured while retrieving refresh token");
		}
	}
}
