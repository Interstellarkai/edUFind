// SpecialNeeds Controller Class 
import SpecialNeedsDAO from "../dao/specialneedsDAO.js"
import { ObjectId } from "mongodb"


export default class SpecialNeedsController {

    static async apiGetSpecialNeeds(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        // const SpecialNeedsPerPage = req.query.SpecialNeedsPerPage ? parseInt(req.query.SpecialNeedsPerPage, 10) : 20
        // const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {} // Filter starts empty
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.zone_code) {
            filters.zone_code = req.query.zone_code
        } if (req.query.barrier_free_facilities) {
            filters.barrier_free_facilities = req.query.barrier_free_facilities
        } if (req.query.hearing_loss) {
            filters.hearing_loss = req.query.hearing_loss
        } if (req.query.visual_impairment) {
            filters.visual_impairment = req.query.visual_impairment
        } if (req.query.option_code) {
            filters.option_code = req.query.option_code
        } if (req.query.aedlearningnbehavl_suppt) {
            filters.aedlearningnbehavl_suppt = req.query.aedlearningnbehavl_suppt
        }
        
        // call the getSpecialNeeds 
        const { SpecialNeedsList, totalNumSpecialNeeds } = await SpecialNeedsDAO.getSpecialNeeds({
            filters,
            // page,
            // SpecialNeedsPerPage,
        })

        // response when the api url is called 
        let response = {
            SpecialNeeds: SpecialNeedsList,
            // page: page,
            filters: filters,
            // entries_per_page: SpecialNeedsPerPage,
            total_results: totalNumSpecialNeeds,
        }
        return res.json(response) // send a json response to whoever made the request
    }

    static async apiGetSchoolName(req, res, next) {
        try {
            let schoolName = await SpecialNeedsDAO.getSchoolName()
            return res.json(schoolName)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
    static async apiGetZoneCode(req, res, next) {
        try {
            let zoneCode = await SpecialNeedsDAO.getZoneCode()
            return res.json(zoneCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetBarrierFreeFacilities(req, res, next) {
        try {
            let barrierFreeFacilities = await SpecialNeedsDAO.getBarrierFreeFacilities()
            return res.json(barrierFreeFacilities)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetHearingLoss(req, res, next) {
        try {
            let hearingLoss = await SpecialNeedsDAO.getHearingLoss()
            return res.json(hearingLoss)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetVisualImpairment(req, res, next) {
        try {
            let visualImpairment = await SpecialNeedsDAO.getVisualImpairment()
            return res.json(visualImpairment)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetOptionCode(req, res, next) {
        try {
            let optionCode = await SpecialNeedsDAO.getOptionCode()
            return res.json(optionCode)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiGetAedLearningnBehavlSuppt(req, res, next) {
        try {
            let AedLearningnBehavlSuppt = await SpecialNeedsDAO.getAedLearningnBehavlSuppt()
            return res.json(AedLearningnBehavlSuppt)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }
}