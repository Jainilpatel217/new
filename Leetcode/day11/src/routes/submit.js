const express=require('express')
const usermiddleware = require('../middleware/usermiddleware')
const submitRouter=express.Router()
// const submitCode=require("../controllers/userSubmission")
const {runCode,submitCode}=require("../controllers/userSubmission")

submitRouter.post("/submit/:id",usermiddleware,submitCode)
submitRouter.post("/run/:id",usermiddleware,runCode)

module.exports=submitRouter;