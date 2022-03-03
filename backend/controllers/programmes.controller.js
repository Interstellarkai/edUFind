// programmes Controller Class 
import ProgrammesDAO from "../dao/programmesDAO.js"
import { ObjectId } from "mongodb"


export default class programmesController {

    static async apiGetProgrammes(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const programmesPerPage = req.query.programmesPerPage ? parseInt(req.query.programmesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        
        let filters = {} // Filter starts empty
        // if zone_code is in the query string, then the zone_code is set to the query string
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.alp_domain) {
            filters.alp_domain = req.query.alp_domain
        } if (req.query.alp_title) {
            filters.alp_title = req.query.alp_title
        } if (req.query.llp_domain1) {
            filters.llp_domain1 = req.query.llp_domain1
        } if (req.query.llp_title1) {
            filters.llp_title1 = req.query.llp_title1
        }

        // call the getProgrammes
        const { programmesList, totalNumProgrammes } = await ProgrammesDAO.getProgrammes({
            filters,
            page,
            programmesPerPage,
        })
        
        // response when the api url is called 
        let response = {
            programmes: programmesList,
            page: page,
            filters: filters,
            entries_per_page: programmesPerPage,
            total_results: totalNumProgrammes,
        }
        return res.json(response) // send a json response to whoever made the request
    }
    
    static async apiGetSchoolName(req, res, next) {
        try {
            let schoolName = await ProgrammesDAO.getSchoolName()
            return res.json(schoolName)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProgrammesAlpDomain(req, res, next) {
        try {
            let programmesAlpDomain = await ProgrammesDAO.getProgrammeAlpDomain()
            return res.json(programmesAlpDomain)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
    static async apiGetProgrammesAlpTitle(req, res, next) {
        try {
            let programmesAlpTitle = await ProgrammesDAO.getProgrammeAlpTitle()
            return res.json(programmesAlpTitle)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProgrammesLlpDomain(req, res, next) {
        try {
            let programmesLlpDomain = await ProgrammesDAO.getProgrammeLlpDomain()
            return res.json(programmesLlpDomain)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProgrammesLlpTitle(req, res, next) {
        try {
            let programmesLlpTitle = await ProgrammesDAO.getProgrammeLlpTitle()
            return res.json(programmesLlpTitle)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}