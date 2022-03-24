// DAO - Data Access Object
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let MOE; // store reference to db

// export class with several async methods
export default class MOEDAO {
	// connect to db initially (as our server starts)
	static async injectDB(conn) {
		// reference is filled
		if (MOE) {
			return;
		}
		// if reference is not filled, we will try to connect with a specific reference in our DB
		try {
			MOE = await conn
				.db(process.env.SCHOOLREVIEWS_NS)
				.collection("moe_programmes");
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in MOEDAO: ${e}`
			);
		}
	}

	// get a list of MOE in the DB
	static async getMOE({
		// options
		filters = null,
		// page = 0,
		// moePerPage = 20,
	} = {}) {
		// query
		let query = {};
		// filters
		if (filters) {
			if ("school_name" in filters) {
				// query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
				query["school_name"] = { $eq: filters["school_name"] }; // text search, search any word in that text
			}
			if ("moe_programme_desc" in filters) {
				query["moe_programme_desc"] = {
					$eq: filters["moe_programme_desc"],
				};
			}
		}

		let cursor;

		try {
			// find all the MOE from the database that go along with the query that was passed in
			cursor = await MOE.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { moeList: [], totalNumMOE: 0 };
		}

		const displayCursor = cursor;
		// .limit(moePerPage)
		// .skip(moePerPage * page) // get to a specific page

		try {
			// const moeList = await displayCursor.toArray()
			const moeList = await displayCursor.toArray();
			const totalNumMOE = await MOE.countDocuments(query);

			return { moeList, totalNumMOE };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { moeList: [], totalNumMOE: 0 };
		}
	}

	static async getSchoolName() {
		let schoolName = [];
		try {
			schoolName = await MOE.distinct("school_name");
			return schoolName;
		} catch (e) {
			console.error(`Unable to get school name,  ${e}`);
			return schoolName;
		}
	}

	static async getMoeProgrammeDesc() {
		let moeProgrammeDesc = [];
		try {
			moeProgrammeDesc = await MOE.distinct("moe_programme_desc");
			return moeProgrammeDesc;
		} catch (e) {
			console.error(`Unable to get MOE programme desc,  ${e}`);
			return moeProgrammeDesc;
		}
	}
}
