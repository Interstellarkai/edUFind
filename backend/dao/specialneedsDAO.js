// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let SpecialNeeds // store reference to db 


// export class with several async methods
export default class specialneedsDAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (SpecialNeeds) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            SpecialNeeds = await conn.db(process.env.SCHOOLREVIEWS_NS).collection("special_needs")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in specialneedsDAO: ${e}`
            )
        }
    }

    // get a list of SpecialNeeds in the DB 
    static async getSpecialNeeds({
        // options 
        filters = null,
        page = 0,
        SpecialNeedsPerPage = 20,
    } = {}) {
        // query
        let query = {}
        // filters 
        if (filters) {
            if ("school_name" in filters) {
                // query = { $text: { $search: filters["school_name"] } } // text search, search any word in that text
                query["y2022_school"] =  { $eq: filters["school_name"] } // text search, search any word in that text
            }
            if ("zone_code" in filters) {
                query["zone"] =  { $eq: filters["zone_code"] }
            }
            if ("barrier_free_facilities" in filters) {
                query["barrier_free_facilities"] =  { $eq: filters["barrier_free_facilities"] }
            }
            if ("hearing_loss" in filters) {
                query["hearing_loss"] =  { $eq: filters["hearing_loss"] }
            } 
            if ("visual_impairment" in filters) {
                query["visual_impairment"] =  { $eq: filters["visual_impairment"] }
            }
            if ("option_code" in filters) {
                query["option_code"] =  { $eq: filters["option_code"] }
            }
            if ("aedlearningnbehavl_suppt" in filters) {
                query["aed-learningnbehavl_suppt"] =  { $eq: filters["aedlearningnbehavl_suppt"] }
            }
        }
        
        let cursor

        try {
            // find all the SpecialNeeds from the database that go along with the query that was passed in
            cursor = await SpecialNeeds
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { SpecialNeedsList: [], totalNumSpecialNeeds: 0 }
        }
        
        const displayCursor = cursor.limit(SpecialNeedsPerPage).skip(SpecialNeedsPerPage * page) // get to a specific page

        try {
            const SpecialNeedsList = await displayCursor.toArray()
            const totalNumSpecialNeeds = await SpecialNeeds.countDocuments(query)
            
            return { SpecialNeedsList, totalNumSpecialNeeds }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { SpecialNeedsList: [], totalNumSpecialNeeds: 0 }
        }
    }

    
        static async getSchoolName() {
        let schoolName = []
        try {
            schoolName = await SpecialNeeds.distinct("y2022_school")
            return schoolName 
        } catch (e){
            console.error(`Unable to get school name,  ${e}`)
            return schoolName
        }
    }

    static async getZoneCode() {
        let zoneCode = []
        try {
            zoneCode = await SpecialNeeds.distinct("zone")
            return zoneCode 
        } catch (e){
            console.error(`Unable to get zone code,  ${e}`)
            return zoneCode
        }
    }

    static async getBarrierFreeFacilities() {
        let barrierFreeFacilities = []
        try {
            barrierFreeFacilities = await SpecialNeeds.distinct("barrier_free_facilities")
            return barrierFreeFacilities 
        } catch (e){
            console.error(`Unable to get barrier free facilities,  ${e}`)
            return barrierFreeFacilities
        }
    }

    static async getHearingLoss() {
        let hearingLoss = []
        try {
            hearingLoss = await SpecialNeeds.distinct("hearing_loss")
            return hearingLoss 
        } catch (e){
            console.error(`Unable to get hearing loss,  ${e}`)
            return hearingLoss
        }
    }
    static async getVisualImpairment() {
        let visualImpairment = []
        try {
            visualImpairment = await SpecialNeeds.distinct("visual_impairment")
            return visualImpairment 
        } catch (e){
            console.error(`Unable to get visual impairment, ${e}`)
            return visualImpairment
        }
    }
    static async getOptionCode() {
        let optionCode = []
        try {
            optionCode = await SpecialNeeds.distinct("option_code")
            return optionCode 
        } catch (e){
            console.error(`Unable to get option code,  ${e}`)
            return optionCode
        }
    }
    static async getAedLearningnBehavlSuppt() {
        let aedLearningnBehavlSuppt = []
        try {
            aedLearningnBehavlSuppt = await SpecialNeeds.distinct("aed-learningnbehavl_suppt")
            return aedLearningnBehavlSuppt 
        } catch (e){
            console.error(`Unable to get AED learning n behaviour support,  ${e}`)
            return aedLearningnBehavlSuppt
        }
    }
}