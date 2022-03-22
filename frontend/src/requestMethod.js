import axios from "axios";

const BASE_URL = "http://localhost:8080/";

// BASE URL
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// SIGN UP LINK
export const SIGNUP = "users/signup/";

// UPDATE
export const UPDATE = "users/editAccountDetails";

// LOGIN
export const LOGIN = "users/login";

// EDIT ACCOUNT
export const EDITACCOUNT = "users/editAccountDetails";

export const GETUID = "users/loginID";

// GET ALL SCHOOLS
export const GETALLSCHOOLS = "schools/general";

// GET SCHOOL BY NAME
export const GETSCHOOL = (name) => {
  return "schools/general?school_name=" + name;
};

//ADD SHORTLISTED
export const ADDSHORTLIST = "shortlist/";

// GET SHORTLISTED
export const GETSHORTLISTED = (id) => "shortlist/" + id + "/viewShortlist";

// DELETE SHORTLISTED
export const DELETESHORTLISTED = (id) =>
  "shortlist/" + id + "/deleteShortlisted";

// FILTER - CCA GROUP - http://localhost:8080/schools/cca?cca_grouping_desc=PHYSICAL SPORTS
export const FilterCcaGrp = (category) =>
  "schools/cca?cca_grouping_desc=" + category;

// FILTER - SUBJECTS - http://localhost:8080/schools/subjects?subject_desc=ART
export const FilterSubject = (subj) => "schools/subjects?subject_desc=" + subj;
