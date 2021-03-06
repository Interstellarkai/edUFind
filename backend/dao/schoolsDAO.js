// DAO - Data Access Object
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let schools; // store reference to db

// export class with several async methods
export default class SchoolsDAO {
	// connect to db initially (as our server starts)
	static async injectDB(conn) {
		// reference is filled
		if (schools) {
			return;
		}
		// if reference is not filled, we will try to connect with a specific reference in our DB
		try {
			schools = await conn
				.db(process.env.SCHOOLREVIEWS_NS)
				.collection("general_information_of_schools");
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in schoolsDAO: ${e}`
			);
		}
	}

	// get a list of schools in the DB
	static async getSchools({
		// options
		filters = null,
		// page = 0,
		// schoolsPerPage = 20,
	} = {}) {
		// query
		let query = {};
		// filters
		if (filters) {
			if ("school_name" in filters) {
				// query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
				query["school_name"] = { $eq: filters["school_name"] }; // text search, search any word in that text
			}
			if ("zone_code" in filters) {
				query["zone_code"] = { $eq: filters["zone_code"] }; // if zone_code in db equals to the zone_code passed in, search for zone_code
			}
			if ("postal_code" in filters) {
				query["postal_code"] = { $eq: filters["postal_code"] };
			}
			if ("mainlevel_code" in filters) {
				query["mainlevel_code"] = { $eq: filters["mainlevel_code"] };
			}

			if ("gifted_ind" in filters) {
				query["gifted_ind"] = { $eq: filters["gifted_ind"] };
			}
			if ("type_code" in filters) {
				query["type_code"] = { $eq: filters["type_code"] };
			}
			if ("nature_code" in filters) {
				query["nature_code"] = { $eq: filters["nature_code"] };
			}
		}
		console.log(filters);

		let cursor;

		try {
			// find all the schools from the database that go along with the query that was passed in
			cursor = await schools.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { schoolsList: [], totalNumSchools: 0 };
		}

		const displayCursor = cursor
			// .limit(schoolsPerPage)
			// .skip(schoolsPerPage * page); // get to a specific page

		try {
			const schoolsList = await displayCursor.toArray();
			const totalNumSchools = await schools.countDocuments(query);

			return { schoolsList, totalNumSchools };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { schoolsList: [], totalNumSchools: 0 };
		}
	}

	// get reviews and put it into school
	static async getSchoolBySchoolName(schoolName) {
		try {
			// create a pipeling (mongo db) to help match different collections together
			const pipeline = [
				{
					// get the intended school from general_information_of_schools collection
					$match: {
						school_name: schoolName,
					},
				},
				{
					// access the comment collection
					$lookup: {
						from: "comments",
						let: {
                            commentSchoolName: "$school_name", // calling key as a different name
						},
						pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        // Single $ means OUTSIDE nested (general info)
										// Double $ means INSIDE the nested (comment)
										$eq: [
                                            "$school_name",
											"$$commentSchoolName",
										],
									},
								},
							},
							{
                                $sort: {
                                    date: -1,
								},
							},
						],
                        as: "comments"
					},
				},
				{
					$addFields: {
						comments: "$comments",
					},
				},
			];
			// aggregate the pipeline means to combine everything together
			// return the next item
			return await schools.aggregate(pipeline).next();
		} catch (e) {
			console.error(
				`Something went wrong in getSchoolBySchoolName: ${e}`
			);
			throw e;
		}
	}

	static async getSchoolName() {
		let schoolName = [];
		try {
			schoolName = await schools.distinct("school_name");
			return schoolName;
		} catch (e) {
			console.error(`Unable to get school name,  ${e}`);
			return schoolName;
		}
	}

	static async getZoneCode() {
		let zoneCode = [];
		try {
			zoneCode = await schools.distinct("zone_code");
			return zoneCode;
		} catch (e) {
			console.error(`Unable to get zone code, ${e}`);
			return zoneCode;
		}
	}

	static async getMainLevelCode() {
		let mainLevelCode = [];
		try {
			mainLevelCode = await schools.distinct("mainlevel_code");
			return mainLevelCode;
		} catch (e) {
			console.error(`Unable to get main level code,  ${e}`);
			return mainLevelCode;
		}
	}

	static async getGiftedInd() {
		let giftedInd = [];
		try {
			giftedInd = await schools.distinct("gifted_ind");
			return giftedInd;
		} catch (e) {
			console.error(`Unable to get gifted Ind,  ${e}`);
			return giftedInd;
		}
	}

	static async getTypeCode() {
		let typeCode = [];
		try {
			typeCode = await schools.distinct("type_code");
			return typeCode;
		} catch (e) {
			console.error(`Unable to get type code,  ${e}`);
			return typeCode;
		}
	}

	static async getNatureCode() {
		let natureCode = [];
		try {
			natureCode = await schools.distinct("nature_code");
			return natureCode;
		} catch (e) {
			console.error(`Unable to get nature code,  ${e}`);
			return natureCode;
		}
	}
}
