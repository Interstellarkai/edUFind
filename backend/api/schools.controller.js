// School Controller Class 
import SchoolsDAO from "../dao/schoolsDAO.js"
import { ObjectId } from "mongodb"


export default class SchoolsController {

    static async apiGetSchools(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const schoolsPerPage = req.query.schoolsPerPage ? parseInt(req.query.schoolsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        
        let filters = {} // Filter starts empty
        // if zone_code is in the query string, then the zone_code is set to the query string
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.zone_code) {
            filters.zone_code = req.query.zone_code
        } if (req.query.postal_code) {
            filters.postal_code = req.query.postal_code
        } if (req.query.mainlevel_code) {
            filters.mainlevel_code = req.query.mainlevel_code
        } if (req.query.gifted_ind) {
            filters.gifted_ind = req.query.gifted_ind
        } if (req.query.nature_code) {
            filters.nature_code = req.query.nature_code
        } if (req.query.type_code) {
            filters.type_code = req.query.type_code
        }
        
        // call the getSchools 
        const { schoolsList, totalNumSchools } = await SchoolsDAO.getSchools({
            filters,
            page,
            schoolsPerPage,
        })

        // response when the api url is called 
        let response = {
            schools: schoolsList,
            page: page,
            filters: filters,
            entries_per_page: schoolsPerPage,
            total_results: totalNumSchools,
        }
        res.json(response) // send a json response to whoever made the request
    }

    static async apiGetSchoolById(req, res, next) {
        try {
            let id = parseInt(req.params.id) || {}
            console.log(id)
            let school = await SchoolsDAO.getSchoolById(id)
            console.log(school)
            if (!school) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(school)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetSchoolZoneCode(req, res, next) {
        // get zonecode if not error
        try {
            let zoneCode = await SchoolsDAO.getZoneCode()
            res.json(zoneCode)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetMainLevelCode(req, res, next) {
        try {
            let mainLevelCode = await SchoolsDAO.getMainLevelCode()
            res.json(mainLevelCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }
    
    static async apiGetGiftedInd(req, res, next) {
        try {
            let giftedInd = await SchoolsDAO.getGiftedInd()
            res.json(giftedInd)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetNatureCode(req, res, next) {
        try {
            let natureCode = await SchoolsDAO.getNatureCode()
            res.json(natureCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetTypeCode(req, res, next) {
        try {
            let typeCode = await SchoolsDAO.getTypeCode()
            res.json(typeCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }


}