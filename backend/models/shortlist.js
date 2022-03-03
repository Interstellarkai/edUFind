import { Int32 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ShortlistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Schools in this schema only stores school name + any notes that the user has added about the school 
    schools: [{ 
        name: {
            type: String, 
            required: true
        },
        notes: {
            type: String
        }

    }]
})

let Shortlist = mongoose.model('Shortlist', UserSchema);
export default Shortlist