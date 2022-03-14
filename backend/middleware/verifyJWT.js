import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

dotenv.config();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || null;

// export default class verifyJWT {
	function authenticateToken(req, res, next) {
		// Get token from the header
		const token = req.headers.authorization;

	if (!JWT_SECRET) {
		console.error(`Middleware: AuthenticateToken: No JWT Key`);
		return res.status(500).json({
			success : false,
			message : "An error occured while verifying token"
		});
	}
	if (!token) {
		console.info(`Middleware: AuthenticateToken: No Token Provided`);
		return res.status(401).json({
			success : false,
			message : "No token provided"
		});
	}

	jwt.verify(token, JWT_SECRET, (err, tokenContent) => {
		if (err) {
			console.info(`Middleware: AuthenticateToken: Invalid Token ${err}`);
			return res.status(401).json({
				success : false,
				message : "Invalid credentials"
			});
		}
		console.log(`Middleware: Authentication successful`);
		req.params.user = tokenContent.userID;
		// req.params.user = ObjectId(tokenContent.userID);

		next();
	});
}
// }
export default authenticateToken