//TO DO: 
// Add to shortlist --> Creates a new shortlist 
// Edit shortlist --> Edit the notes on the shortlist
// Delete shortlist
// Get all shortlists 

import ShortlistDAO from "../dao/shortlistDAO";

export default class ShortlistController {
    static async addShortlist(req, res){
        const userId = req.params.id
        const schoolName = req.body.school_name
        const schoolNotes = req.body.school_notes

        try {
            const shortlistItem = await ShortlistDAO.createShortlist( userId, schoolName, schoolNotes)
            return res.json( { status: "success"})

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async editShortlist(req, res){
        try {
            const userId = req.params.id
            const shortlistId = req.body.shortlist_id
            const schoolName = req.body.school_name
            const schoolNotes = req.body.school_notes

            const ShortlistRespones = await ShortlistDAO.editShortlist(userId, shortlistId, schoolName, schoolNotes)

            var { error } = ShortlistRespones
            if (error) {
                return res.status(400).json({ error })
            }

            return res.json( { status: "success "})
        }catch (e){
            return res.status(500).json( { error: e.message })
        }
    }

    static async removeShortlistItem(req, res){
        try {
            const shortlistId = req.body.shortlist_id 
            const userId = req.params.id

            const ShortlistResponse = await ShortlistDAO.deleteShortlisted(userId, shortlistId)
            return res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async getShortlisted(req, res){
        // TO DO: Add per page queries 
        const userId = req.params.id
        const shortlisted = await ShortlistDAO.getAllShortlisted(userId)
        return res.json(shortlisted)
    }
}
