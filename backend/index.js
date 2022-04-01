// connect the db and start the server 

import app from "./server.js" 
import express from "express";
import mongodb from "mongodb" // access mongodb
import dotenv from "dotenv" // access env var
import SchoolsDAO from "./dao/schoolsDAO.js"
import CommentsDAO from "./dao/commentsDAO.js"
import CCADAO from "./dao/ccaDAO.js"
import MOEDAO from "./dao/moeDAO.js"
import ProgrammesDAO from "./dao/programmesDAO.js"
import SpecialNeedsDAO from "./dao/specialneedsDAO.js"
import SubjectsDAO from "./dao/subjectsDAO.js"
import UserAuthDAO from "./dao/userAuthDAO.js"
import ShortlistDAO from "./dao/shortlistDAO.js"
import refreshTokenRepo from "./dao/refreshTokenRepo.js"
import crypto from 'crypto';

// configure dotenv
dotenv.config()

// give access to mongo client
const MongoClient = mongodb.MongoClient 

// if the port we specified cannot be accessed, we use port 8000
const port = process.env.PORT || 8080

// Random string generated using 'crypto'. Used to encrypt user's token later on
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
console.log(`Backend Secret Key Token:\n${crypto.randomBytes(64).toString('hex')}\n`);
console.log(`Backend Refresh SK Token:\n${crypto.randomBytes(64).toString('hex')}`);
console.log("\n<Please store this secret key into .env file>\n");

// connect to db
MongoClient.connect(
    // passing in the options to access the database
    // https://stackoverflow.com/questions/68416009/mongoparseerror-options-poolsize-usenewurlparse-are-not-supported 
    
    process.env.SCHOOLREVIEWS_DB_URI, {
        maxPoolSize: 50, // make it so only 50 people can connect at a time
        wtimeoutMS: 2500, // request will time out after 2500ms
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // catch errors
    .catch(err => {
        console.log("Index.js: Cannot connect to DB")
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await SchoolsDAO.injectDB(client) // get initial reference to the school collection in the DB
        await CommentsDAO.injectDB(client)
        await CCADAO.injectDB(client)
        await MOEDAO.injectDB(client)
        await ProgrammesDAO.injectDB(client)
        await SpecialNeedsDAO.injectDB(client)
        await SubjectsDAO.injectDB(client)
        await UserAuthDAO.injectDB(client)
        await ShortlistDAO.injectDB(client)
        await refreshTokenRepo.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`) // ` not '
        }) 
    })

