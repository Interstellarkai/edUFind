// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let CCAs // store reference to db 


// export class with several async methods
export default class CCADAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (CCAs) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            CCAs = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("co_curriculum_activities")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in CCADAO: ${e}`
            )
        }
    }

    // get a list of CCAs in the DB 
    static async getCCAs({
        // options 
        filters = null,
        page = 0,
        CCAsPerPage = 20,
    } = {}) {
        // query
        let query = {}
        // filters 
        if (filters) {
            if ("school_name" in filters) {
                // query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
                query["school_name"] =  { $eq: filters["school_name"] } // text search, search any word in that text
            }
            if ("cca_grouping_desc" in filters) {
                query["cca_grouping_desc"] =  { $eq: filters["cca_grouping_desc"] }
            }
            if ("cca_generic_name" in filters) {
                query["cca_generic_name"] =  { $eq: filters["cca_generic_name"] }
            }
        }
        
        let cursor

        try {
            // find all the CCAs from the database that go along with the query that was passed in
            cursor = await CCAs
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { CCAsList: [], totalNumCCAs: 0 }
        }
        
        const displayCursor = cursor.limit(CCAsPerPage).skip(CCAsPerPage * page) // get to a specific page

        try {
            const CCAsList = await displayCursor.toArray()
            const totalNumCCAs = await CCAs.countDocuments(query)
            
            return { CCAsList, totalNumCCAs }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { CCAsList: [], totalNumCCAs: 0 }
        }
    }

    static async getCcaGenericName() {
        let ccaGenericName = []
        try {
            ccaGenericName = await CCAs.distinct("cca_generic_name")
            return ccaGenericName 
        } catch (e){
            console.error(`Unable to get ccaGenericName,  ${e}`)
            return ccaGenericName
        }
    }

    static async getCcaGroupingDesc() {
        let ccaGroupingDesc = []
        try {
            ccaGroupingDesc = await CCAs.distinct("cca_grouping_desc")
            return ccaGroupingDesc 
        } catch (e){
            console.error(`Unable to get ccaGroupingDesc,  ${e}`)
            return ccaGroupingDesc
        }
    }
}