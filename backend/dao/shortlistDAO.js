// TO DO:
// Inject DB
// Create Shortlist --> Creates a new shortlist table
// Edit Shortlist --> Edit a shortlist table (Changing the notes)
// Remove Shortlist --> Delete a shortlist table
// Get Shortlist --. Get all shortlist items by user ID

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
				`Unable to establish collection handles in shortlistDAO: ${e}`
			);
		}
	}

	// Creates shortlist
	static async createShortlist(user, schoolName, schoolNotes) {
		try {
			const newShortlist = new Shortlist({
				user_id: user,
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
				{  _id: ObjectId(shortlistId), user_id: ObjectId(userId), school_name: schoolName },
				{
					$set: {
						school_notes: schoolNotes,
					}
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
		let allShortlist
        try {
            allShortlist = await shortlist.find({ user_id: userId });
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { shortlisted: [], totalNumShortlisted: 0 }
        }

        const displayShortlist = allShortlist
        try {
			console.log("Help")
            const shortlisted = await displayShortlist.toArray()
			// console.log(shortlisted)
            // const totalNumShortlisted = await shortlist.countDocuments(userId)

            return { shortlisted }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { shortlisted: [] }
        }
	}

	static async deleteShortlisted(userId, shortlistId) {
		try {
			const deleteResponse = await shortlist.deleteOne({
				_id: ObjectId(shortlistId),
				user_id: ObjectId(userId),
			});

			return deleteResponse;
		} catch (e) {
			console.error(`Unable to remove item from shortlist: ${e}`);
			return { error: e };
		}
	}
}
