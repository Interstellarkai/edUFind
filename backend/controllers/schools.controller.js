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
        return res.json(response) // send a json response to whoever made the request
    }

    static async apiGetSchoolBySchoolName(req, res, next) {
        try {
            let school_name = req.params.school_name || {}
            console.log(school_name)
            let school = await SchoolsDAO.getSchoolBySchoolName(school_name)
            console.log(school)
            if (!school) {
                res.status(404).json({ error: "Not found" })
                return
            }
            return res.json(school)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetSchoolName(req, res, next) {
        try {
            let schoolName = await SchoolsDAO.getSchoolName()
            return res.json(schoolName)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetZoneCode(req, res, next) {
        // get zonecode if not error
        try {
            let zoneCode = await SchoolsDAO.getZoneCode()
            return res.json(zoneCode)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetMainLevelCode(req, res, next) {
        try {
            let mainLevelCode = await SchoolsDAO.getMainLevelCode()
            return res.json(mainLevelCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }
    
    static async apiGetGiftedInd(req, res, next) {
        try {
            let giftedInd = await SchoolsDAO.getGiftedInd()
            return res.json(giftedInd)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetNatureCode(req, res, next) {
        try {
            let natureCode = await SchoolsDAO.getNatureCode()
            return res.json(natureCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetTypeCode(req, res, next) {
        try {
            let typeCode = await SchoolsDAO.getTypeCode()
            return res.json(typeCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }


}