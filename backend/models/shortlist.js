// Shortlist Schema
// Each shortlist item is a school 
// Everytime the user "adds to shortlist", we are creating a new shortlist

import { Int32 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ShortlistSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    school_name: {
        type: String, 
        required: true
    },

    school_notes: {
        type: String
    }
})

let Shortlist = mongoose.model('Shortlist', ShortlistSchema);
export default Shortlist