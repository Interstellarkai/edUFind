// Subjects Controller Class 
import SubjectsDAO from "../dao/subjectsDAO.js"
import { ObjectId } from "mongodb"


export default class SubjectsController {

    static async apiGetSubjects(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const SubjectsPerPage = req.query.SubjectsPerPage ? parseInt(req.query.SubjectsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {} // Filter starts empty
        if (req.query.school_name) {
            filters.school_name = req.query.school_name
        } if (req.query.subject_desc) {
            filters.subject_desc = req.query.subject_desc
        }
        
        // call the getSubjects 
        const { SubjectsList, totalNumSubjects } = await SubjectsDAO.getSubjects({
            filters,
            page,
            SubjectsPerPage,
        })

        // response when the api url is called 
        let response = {
            Subjects: SubjectsList,
            page: page,
            filters: filters,
            entries_per_page: SubjectsPerPage,
            total_results: totalNumSubjects,
        }
        res.json(response) // send a json response to whoever made the request
    }

    static async apiGetSchoolName(req, res, next) {
        try {
            let schoolName = await SubjectsDAO.getSchoolName()
            res.json(schoolName)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
    static async apiGetSubjectDesc(req, res, next) {
        try {
            let subjectDesc = await SubjectsDAO.getSubjectDesc()
            res.json(subjectDesc)
        } catch (e) {
            console.log(`api  ${e}`)
            res.status(500).json({ error: e})
        }
    }
}