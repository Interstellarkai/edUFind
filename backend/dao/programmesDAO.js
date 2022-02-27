// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let Programmes // store reference to db 


// export class with several async methods
export default class ProgrammesDAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (Programmes) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            Programmes = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("school_distinctive_programmes")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in ProgrammesDAO: ${e}`
            )
        }
    }

    // get a list of Programmes in the DB 
    static async getProgrammes({
        // options 
        filters = null,
        page = 0,
        programmesPerPage = 20,
    } = {}) {
        // query
        let query = {}
        // filters 
        if (filters) {
            if ("school_name" in filters) {
                // query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
                query["school_name"] =  { $eq: filters["school_name"] } // text search, search any word in that text
            }
            if ("alp_domain" in filters) {
                query["alp_domain"] =  { $eq: filters["alp_domain"] }
            }
            if ("alp_title" in filters) {
                query["alp_title"] =  { $eq: filters["alp_title"] }
            }
            if ("llp_domain1" in filters) {
                query["llp_domain1"] =  { $eq: filters["llp_domain1"] }
            }
            if ("llp_title1" in filters) {
                query["llp_title1"] =  { $eq: filters["llp_title1"] }
            }
        }

        let cursor

        try {
            // find all the Programmes from the database that go along with the query that was passed in
            cursor = await Programmes
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { programmesList: [], totalNumProgrammes: 0 }
        }

        const displayCursor = cursor.limit(programmesPerPage).skip(programmesPerPage * page) // get to a specific page

        try {
            const programmesList = await displayCursor.toArray()
            const totalNumProgrammes = await Programmes.countDocuments(query)
            
            return { programmesList, totalNumProgrammes }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { programmesList: [], totalNumProgrammes: 0 }
        }
    }

    static async getProgrammeAlpDomain() {
        let programmesAlpDomain = []
        try {
            programmesAlpDomain = await Programmes.distinct("alp_domain")
            return programmesAlpDomain 
        } catch (e){
            console.error(`Unable to get programmesAlpDomain,  ${e}`)
            return programmesAlpDomain
        }
    }

    static async getProgrammeAlpTitle() {
        let programmesAlpTitle = []
        try {
            programmesAlpTitle = await Programmes.distinct("alp_title")
            return programmesAlpTitle 
        } catch (e){
            console.error(`Unable to get programmesAlpTitle,  ${e}`)
            return programmesAlpTitle
        }
    }

    static async getProgrammeLlpDomain() {
        let programmesLlpDomain = []
        try {
            programmesLlpDomain = await Programmes.distinct("llp_domain1")
            return programmesLlpDomain 
        } catch (e){
            console.error(`Unable to get programmesLlpDomain,  ${e}`)
            return programmesLlpDomain
        }
    }

    static async getProgrammeLlpTitle() {
        let programmesLlpTitle = []
        try {
            programmesLlpTitle = await Programmes.distinct("llp_title1")
            return programmesLlpTitle 
        } catch (e){
            console.error(`Unable to get programmesLlpTitle,  ${e}`)
            return programmesLlpTitle
        }
    }
}