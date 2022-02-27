// CCA Controller Class 
import CCADAO from "../dao/ccaDAO.js"
import { ObjectId } from "mongodb"


export default class CCAController {

    static async apiGetCCAs(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const CCAsPerPage = req.query.CCAsPerPage ? parseInt(req.query.CCAsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        
        let filters = {} // Filter starts empty
        // if zone_code is in the query string, then the zone_code is set to the query string
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.cca_grouping_desc) {
            filters.cca_grouping_desc = req.query.cca_grouping_desc
        } if (req.query.cca_generic_name) {
            filters.cca_generic_name = req.query.cca_generic_name
        }
        
        // call the getCCAs 
        const { CCAsList, totalNumCCAs } = await CCADAO.getCCAs({
            filters,
            page,
            CCAsPerPage,
        })

        // response when the api url is called 
        let response = {
            CCAs: CCAsList,
            page: page,
            filters: filters,
            entries_per_page: CCAsPerPage,
            total_results: totalNumCCAs,
        }
        res.json(response) // send a json response to whoever made the request
    }

    static async apiGetSchoolName(req, res, next) {
        try {
            let schoolName = await CCADAO.getSchoolName()
            res.json(schoolName)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetCcaGroupingDesc(req, res, next) {
        try {
            let CcaGroupingDesc = await CCADAO.getCcaGroupingDesc()
            res.json(CcaGroupingDesc)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetCcaGenericName(req, res, next) {
        try {
            let CcaGenericName = await CCADAO.getCcaGenericName()
            res.json(CcaGenericName)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }
}