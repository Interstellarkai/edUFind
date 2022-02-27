// moe Controller Class 
import MOEDAO from "../dao/moeDAO.js"
import { ObjectId } from "mongodb"


export default class moeController {

    static async apiGetMOE(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const moePerPage = req.query.moePerPage ? parseInt(req.query.moePerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        
        let filters = {} // Filter starts empty
        // if zone_code is in the query string, then the zone_code is set to the query string
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.moe_programme_desc) {
            filters.moe_programme_desc = req.query.moe_programme_desc
        }
        
        // call the getMOE
        const { moeList, totalNumMOE } = await MOEDAO.getMOE({
            filters,
            page,
            moePerPage,
        })
        
        // response when the api url is called 
        let response = {
            moe: moeList,
            page: page,
            filters: filters,
            entries_per_page: moePerPage,
            total_results: totalNumMOE,
        }
        res.json(response) // send a json response to whoever made the request
    }

    static async apiGetMoeProgrammeDesc(req, res, next) {
        try {
            let moeProgrammeDesc = await MOEDAO.getMoeProgrammeDesc()
            res.json(moeProgrammeDesc)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}