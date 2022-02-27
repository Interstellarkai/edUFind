// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let Subjects // store reference to db 


// export class with several async methods
export default class subjectsDAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (Subjects) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            Subjects = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("subjects_offered")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in subjectsDAO: ${e}`
            )
        }
    }

    // get a list of Subjects in the DB 
    static async getSubjects({
        // options 
        filters = null,
        page = 0,
        SubjectsPerPage = 20,
    } = {}) {
        // query
        let query = {}
        // filters 
        if (filters) {
            if ("school_name" in filters) {
                // query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
                query["school_name"] =  { $eq: filters["school_name"] } // text search, search any word in that text
            }
            if ("subject_desc" in filters) {
                query["subject_desc"] =  { $eq: filters["subject_desc"] }
            }
        }
        
        let cursor

        try {
            // find all the Subjects from the database that go along with the query that was passed in
            cursor = await Subjects
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { SubjectsList: [], totalNumSubjects: 0 }
        }
        
        const displayCursor = cursor.limit(SubjectsPerPage).skip(SubjectsPerPage * page) // get to a specific page

        try {
            const SubjectsList = await displayCursor.toArray()
            const totalNumSubjects = await Subjects.countDocuments(query)
            
            return { SubjectsList, totalNumSubjects }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { SubjectsList: [], totalNumSubjects: 0 }
        }
    }

    static async getSchoolName() {
        let schoolName = []
        try {
            schoolName = await Subjects.distinct("school_name")
            return schoolName 
        } catch (e){
            console.error(`Unable to get school name,  ${e}`)
            return schoolName
        }
    }

    static async getSubjectDesc() {
        let subjectDesc = []
        try {
            subjectDesc = await Subjects.distinct("subject_desc")
            return subjectDesc 
        } catch (e){
            console.error(`Unable to get subject desc,  ${e}`)
            return subjectDesc
        }
    }
}