import { Int32 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ShortlistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // TO DO: Figure out a way to store an array of schools with some details?
    schools: [{ type: String }],
    notes: String
})

let Shortlist = mongoose.model('Shortlist', UserSchema);
export default Shortlist