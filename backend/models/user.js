// https://mongoosejs.com/docs/guide.html
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String, // String is shorthand for {type: String}
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',
          ], // email validation
        unique: true,
        dropDups: true // ensure emails are unique
    }, 
    gender: {
        type: String, 
        enum: ['Female', 'Male', 'Others', 'Prefer Not to Say']
    }, 

    region: {
        type: String,
        enum: ['North', 'South', 'East', 'West']
    },
    motherTongueLanguage: {
        type: String, 
        enum: ['Chinese', 'Tamil', 'Malay', 'Others']
    }, 
    educationLevel: {
        type: String,
        enum: ['Primary', 'Secondary', 'Junior College']
    }, 
    ccaInterests: {
        type: String, 
        enum: ['Perfomring Arts', 'Sports', 'Clubs and Societies', 'Others']
    }
});

let user = mongoose.model('User', UserSchema);
export default user