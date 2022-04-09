// import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RefreshTokenRepo from "../dao/refreshTokenRepo.js";

dotenv.config();

const JWT_SECRET = process.env.REFRESH_TOKEN_SECRET || null;

// export default class refreshJWT {
	// static async authenticateRefreshToken(req, res, next) {
function authenticateRefreshToken(req, res, next) {
	const token = req.headers.authorization;

	if (!JWT_SECRET) {
		console.error(`Middleware: AuthenticateRefreshToken: No JWT Key`);
		return res.json({
			success: false,
			message: "An error occured while verifying token",
		});
	}
	if (!token) {
		console.info(
			`Middleware: AuthenticateRefreshToken: No Token Provided`
		);
		return res.json({ 
			success: false,
			message: "No token provided" 
		});
	}

	jwt.verify(token, JWT_SECRET.toString(), (err, tokenContent) => {
		if (err) {
			console.info(`Middleware: AuthenticateToken: Error verifying token: ${err}`);
			return res.status(401).json({ message: "Error verifying refresh token" });
		}
		const refreshToken = RefreshTokenRepo.GetRefreshTokenByToken(token);

		if (!refreshToken) {
			res.status(401).json({
				success: false,
				message: "Invalid refresh token, please reauthenticate",
			});
			return;
		}

		// Check expiry
		if (refreshToken.expiresAt < new Date()) {
			res.status(401).json({
				success: false,
				message: "Invalid refresh token, please reauthenticate",
			});
			return;
		}

		const newExpiry = new Date();
		newExpiry.setDate(newExpiry.getDate() + 7);
		refreshToken.expiresAt = newExpiry;

		try {
			// Save the refresh token into mongoose
			refreshToken.save();
		} catch (err) {
			console.error(
				"Middleware: AuthenticateRefreshToken: Error extending refresh token expiry"
			);
			res.status(500).json({
				success: false,
				message: "An error occured while refreshing token",
			});
		}

		req.params.user = tokenContent._id;

		next();
	});
}
export default authenticateRefreshToken
// }
