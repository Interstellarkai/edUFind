// import mongoose from "mongoose";
// const { Schema } = mongoose;
// import { IUser } from "./user";

// const IRefreshToken = new Schema({
// 	_id: {
// 		type: String,
// 		required: true,
// 	},
// 	user: {
// 		type: IUser["_id"],
// 		required: true,
// 	},
// 	token: {
// 		type: string,
// 		required: true,
// 	},
// 	generatedAt: {
// 		type: Date,
// 		required: true,
// 	},
// 	expiresAt: {
// 		type: Date,
// 		required: true,
// 	},
// });

// const refreshTokenSchema = new Schema({
// 	user: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "user",
// 	},
// 	token: {
// 		type: String,
// 		unique: true,
// 	},
// 	generatedAt: {
// 		type: Date,
// 	},
// 	expiresAt: {
// 		type: Date,
// 	},
// });

// let RefreshToken =
// 	mongoose.model < IRefreshToken > ("refreshToken", refreshTokenSchema);

// export { RefreshToken as default };
