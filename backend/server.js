// configure an express server

<<<<<<< Updated upstream
// import statements 
import express, { application } from "express"
import cors from "cors"
import schools from "./routes/schools.route.js" // Routes for school related functions 
import users from "./routes/user.route.js" // Routes for user related functions 
import shortlist from "./routes/shortlist.route.js"
import dotenv from "dotenv" // access env var
import mongoose from "mongoose"
=======
// import statements
import express, { application } from "express";
import cors from "cors";
import schools from "./routes/schools.route.js"; // Routes for school related functions
import users from "./routes/user.route.js"; // Routes for user related functions
import dotenv from "dotenv"; // access env var
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'; // Token Authentication
>>>>>>> Stashed changes

const app = express(); // using to make server

// middle ware
app.use(cors());
app.use(express.json()); // server can accept json in the body of a request

// initial routes
<<<<<<< Updated upstream
app.use("/schools", schools)
app.use("/users", users)
app.use('/shortlist', shortlist)
app.use("*", (req, res) => res.status(404).json({error: "not found"})) // * means wild card, a route that is not in our route file, then we return 404 page not found


// export app as a module --> import the file that accesses the db 
// separate server code from the db code 
export default app 
=======
app.use("/schools", schools);
app.use("/users", users);
app.use("*", (req, res) => res.status(404).json({ error: "not found" })); // * means wild card, a route that is not in our route file, then we return 404 page not found
>>>>>>> Stashed changes

// export app as a module --> import the file that accesses the db
// separate server code from the db code
export default app;
