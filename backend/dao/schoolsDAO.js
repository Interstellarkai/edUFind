// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let schools // store reference to db 


// export class with several async methods
export default class SchoolsDAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (schools) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            schools = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("general_information_of_schools")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in schoolsDAO: ${e}`
            )
        }
    }

    // get a list of schools in the DB 
    static async getSchools({
        // options 
        filters = null,
        page = 0,
        schoolsPerPage = 20,
    } = {}) {
        // query
        let query
        // 3 different filters 
        if (filters) {
            if ("school_name" in filters) {
                query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
            }
            else if ("zone_code" in filters) {
                query = { "zone_code": { $eq: filters["zone_code"] } } // if zone_code in db equals to the zone_code passed in, search for zone_code
            }
            else if ("postal_code" in filters) {
                query = { "postal_code": { $eq: filters["postal_code"] } }
            }
        }

        let cursor

        try {
            // find all the schools from the database that go along with the query that was passed in
            cursor = await schools
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { schoolsList: [], totalNumSchools: 0 }
        }

        const displayCursor = cursor.limit(schoolsPerPage).skip(schoolsPerPage * page) // get to a specific page

        try {
            const schoolsList = await displayCursor.toArray()
            const totalNumSchools = await schools.countDocuments(query)

            return { schoolsList, totalNumSchools }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { schoolsList: [], totalNumSchools: 0 }
        }
    }

    // get reviews and put it into school
    static async getSchoolById(id) {
        try {
            // create a pipeling (mongo db) to help match different collections together
            const pipeline = [
                {
                    $match: {
                        _id: id
                    },
                },
                {
                    $lookup: {
                        from: 'comments',
                        let: {
                            id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$school_id", "$$id"], 
                                    },
                                },

                            },
                            {
                                $sort: {
                                    date: -1
                                }
                            }
                            
                        ],
                        as: 'comments'
                    },
                },
                {
                    $addFields: {
                        comments: "$comments",
                    },
                },
            ]
            console.log(pipeline)
            // aggregate the pipeline means to combine everything together
            // return the next item 
            return await schools.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getSchoolByID: ${e}`)
            throw e
        }
    }

    static async getZoneCode() {
        let zonecode = []
        try {
            zonecode = await schools.distinct("zone_code")
            return zonecode
        } catch (e) {
            console.error(`Unable to get zonecode, ${e}`)
            return zonecode
        }
    }
}