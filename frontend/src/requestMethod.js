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
