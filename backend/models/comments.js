// Not too sure if this is needed 
import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentsSchema = new Schema({
    name: String,

    // Taking user_id from the User Schema
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    date: Date,
    text: String,
    school_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'general_schools_information'
    }
})

let Comments = mongoose.model('Comment', CommentsSchema);
export default Comments