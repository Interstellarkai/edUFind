// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';

// dotenv.config();

// const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
// export default class verifyJWT{
// 	static async authenticateToken(req, res, next){
// 		// Get token from the header
// 		const token = req.headers.authorization;
		
// 		if (!JWT_SECRET) {
// 			console.error(`Middleware: AuthenticateToken: No JWT Key`);
// 			return res.status(500).json({ message: 'An error occured while verifying token' });
// 		}
// 		if (!token) {
// 			console.info(`Middleware: AuthenticateToken: No Token Provided`);
// 			return res.status(401).json({ message: 'No token provided' });
// 		}
		
// 		jwt.verify(token, JWT_SECRET, (err, tokenContent) => {
// 			console.log(err)
// 			if (err) {
// 				console.info(`Middleware: AuthenticateToken: Invalid Token`);
// 				return res.status(401).json({ message: 'Invalid credentials' });
// 			}
// 			req.params.user = tokenContent.userID;
// 			next()
// 		})
//         next();
// 	}

// }

// export default authenticateToken;