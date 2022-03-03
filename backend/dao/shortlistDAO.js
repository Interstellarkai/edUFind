// TO DO: Shortlist Functions

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import Shortlist from "../models/shortlist.js";

let shortlist;

export default class ShortlistDAO {
	static async injectDB(conn) {
		if (shortlist) {
			return;
		}
		try {
			shortlist = await conn
				.db(process.env.SCHOOLREVIEWS_NS)
				.collection("shortlist");
		} catch (e) {
			console.error(
				`Unable to establish collection handles in commentDAO: ${e}`
			);
		}
	}

	// Creates shortlist
	static async createShortlist(user, schools) {
		try {
			// const normalizedEmail = email.trim().toLowerCase();
			const newShortlist = new Shortlist({
				user: user.ObjectId,
				schools: schools,
			});

			return await accounts.insertOne(newShortlist);
		} catch (e) {
			console.error(`Unable to create shortlist: ${e}`);
			return {
				success: false,
				message: `Unable to create shortlist: ${e}`,
			};
		}
	}

  // Adding new schools to the current shortlist 
	static async addToShortlist(userId, schools) {
		try {
			const addShortlist = await shortlist.updateOne(
				{ _id: ObjectId(userId) },
				{
					$set: {
						schools: schools,
					},
				}
			);
			return addShortlist;
		} catch (e) {
			console.error(`Unable to update shortlist: ${e}`);
			return { error: e };
		}
	}

  // Get shortlisted schools by User Id 
	static async getShortlistedById(userId) {
		// TO DO
    try {
			// const normalizedEmail = email.trim().toLowerCase();
			const shortlistId = await shortlist.findOne({ user: userId });
			return shortlistId;
		} catch (e) {
			console.error(`Unable to get shortlist from User: ${e}`);
			return null;
		}
	}

	static async getAllShortlisted(userId) {
		const allShortlist = await shortlist.find( { user: userId})
    return res.json(allShortlist)
	}

	static async deleteShortlistedById() {
		// TO DO 
	}
}
