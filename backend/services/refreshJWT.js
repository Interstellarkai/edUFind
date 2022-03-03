// // import { NextFunction, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import RefreshTokenRepo from '../repo/refreshTokenRepo';

// dotenv.config();

// const JWT_SECRET = process.env.JWT_REFRESH_SK || None;

// export default class UserController {
// 	static async authenticateRefreshToken(req, res, next){
// 		const token = req.headers.authorization;

// 		if (!JWT_SECRET) {
// 			console.error(`Middleware: AuthenticateRefreshToken: No JWT Key`);
// 			return res.json({ message: 'An error occured while verifying token' });
// 		}
// 		if (!token) {
// 			console.info(`Middleware: AuthenticateRefreshToken: No Token Provided`);
// 			return res.json({ message: 'No token provided' });
// 		}

// 		// jwt.verify(token, JWT_SECRET.toString(), async (err, tokenContent){
// 		// 	if (err) {
// 		// 		res.status(401).send('Error verifying refresh token');
// 		// 		return;
// 		// 	}

// 		// 	const refreshToken = await RefreshTokenRepo.GetRefreshTokenByToken(token);
// 		// 	if (!refreshToken) {
// 		// 		res.status(401).json({ message: 'Invalid refresh token, please reauthenticate' });
// 		// 		return;
// 		// 	}

// 		// 	// Check expiry
// 		// 	if (refreshToken.expiresAt < new Date()) {
// 		// 		res.status(401).json({ message: 'Invalid refresh token, please reauthenticate' });
// 		// 		return;
// 		// 	}

// 		// 	const newExpiry = new Date();
// 		// 	newExpiry.setDate(newExpiry.getDate() + 7);
// 		// 	refreshToken.expiresAt = newExpiry;

// 		// 	try {
// 		// 		await refreshToken.save();
// 		// 	} catch (err) {
// 		// 		console.error('Middleware: AuthenticateRefreshToken: Error extending refresh token expiry');
// 		// 		res.status(500).json({ message: 'An error occured while refreshing token' });
// 		// 	}

// 		// 	req.params.user = tokenContent.userID;

// 		// 	next();
// 		// });
// 	}
// }
// export { authenticateRefreshToken as default };