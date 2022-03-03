// General School Info Schema to help with Shortlist Functions
import mongoose from "mongoose";
const { Schema } = mongoose;

const SchoolSchema = new Schema({
	_id: Number,
	fax_no: String,
	gifted_ind: String,
	mothertongue3_code: String,
	fifth_vp_name: String,
	postal_code: String,
	type_code: String,
	second_vp_name: String,
	first_vp_name: String,
	mainlevel_code: String,
	email_address: String,
	sap_ind: String,
	telephone_no_2: String,
	mrt_desc: String,
	bus_desc: String,
	third_vp_name: String,
	telephone_no: String,
	ip_ind: String,
	principal_name: String,
	mothertongue1_code: String,
	nature_code: String,
	fourth_vp_name: String,
	autonomous_ind: String,
	session_code: String,
	school_name: String,
	dgp_code: String,
	address: String,
	sixth_vp_name: String,
	mothertongue2_code: String,
	fax_no_2: String,
	zone_code: String,
	url_address: String,
});

let School = mongoose.model("School", SchoolSchema);
export default School;
