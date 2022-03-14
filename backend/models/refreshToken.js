import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./user.js";

const refreshTokenSchema = new Schema({
	user: {
		type: ObjectId,
		ref: "user",
	},
	token: {
		type: String,
		unique: true,
	},
	refreshToken: {
		type: String,
		unique: true,
	},
	generatedAt: {
		type: Date,
	},
	expiresAt: {
		type: Date,
	},
});

let RefreshToken = mongoose.model("refresh_token", refreshTokenSchema);

export default RefreshToken;