// TO DO:
// Inject DB
// Create Shortlist --> Creates a new shortlist table
// Edit Shortlist --> Edit a shortlist table (Changing the notes)
// Remove Shortlist --> Delete a shortlist table
// Get Shortlist --. Get all shortlist items by user ID

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import Shortlist from "../models/shortlist.js";
import School from "../models/schools.js";

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
	static async createShortlist(user, schoolName, schoolNotes) {
		let school = await School.findOne({ school_name: schoolName});
		if (!school){
			console.error(`School not found!`)
			return {
				success: false,
				message: `School Not Found: ${e}`,
			};
		}

		try {
			const newShortlist = new Shortlist({
				user: user.ObjectId,
				school_name: schoolName,
				school_notes: schoolNotes,
			});

			return await shortlist.insertOne(newShortlist);
		} catch (e) {
			console.error(`Unable to create shortlist: ${e}`);
			return {
				success: false,
				message: `Unable to create shortlist: ${e}`,
			};
		}
	}

	// Edit the notes on the school
	static async editShortlist(userId, shortlistId, schoolName, schoolNotes) {
		try {
			const addShortlist = await shortlist.updateOne(
				{ user_id: userId, _id: ObjectId(shortlistId), school_name: schoolName },
				{
					$set: {
						school_notes: schoolNotes,
					},
				}
			);
			return addShortlist;
		} catch (e) {
			console.error(`Unable to update shortlist: ${e}`);
			return { 
				sucess: false,
				error: e,
				message: `Unable to update shortlist`
			};
		}
	}

	// Get all shortlisted schools by User Id
	static async getAllShortlisted(userId) {
		const allShortlist = await shortlist.find({ user: userId });
		return res.json(allShortlist);
	}

	static async deleteShortlisted(userId, shortlistId) {
		try {
			const deleteResponse = await shortlist.deleteOne({
				_id: ObjectId(shortlistId),
				user_id: userId,
			});

			return deleteResponse;
		} catch (e) {
			console.error(`Unable to remove item from shortlist: ${e}`);
			return { error: e };
		}
	}
}
