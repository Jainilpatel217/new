
const express=require('express');

const problemRouter=express.Router();

const adminmiddleware=require('../middleware/adminMiddleware')

const {CreateProblem,Updateproblem,Deleteproblem,getproblemById,getAllProblem,solvedAllproblembyuser,submittedProblem}=require("../controllers/userproblem");
const usermiddleware = require('../middleware/usermiddleware');




//create
problemRouter.post('/create',adminmiddleware,CreateProblem);
problemRouter.put('/update/:id',adminmiddleware,Updateproblem);
problemRouter.delete('/delete/:id',adminmiddleware,Deleteproblem)

problemRouter.get('/problemById/:id',usermiddleware,getproblemById);
problemRouter.get("/getAllProblem",usermiddleware,getAllProblem);
problemRouter.get('/problemSolvedByUser',usermiddleware,solvedAllproblembyuser)
problemRouter.get('/submittedProblem/:pid',usermiddleware,submittedProblem)
//fetch
//update
//delete

module.exports=problemRouter;



// const express = require('express');

// const problemRouter =  express.Router();
// const adminMiddleware = require("../middleware/adminMiddleware");
// const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem} = require("../controllers/userProblem");
// const userMiddleware = require("../middleware/userMiddleware");


// // Create
// problemRouter.post("/create",adminMiddleware ,createProblem);
// problemRouter.put("/update/:id",adminMiddleware, updateProblem);
// problemRouter.delete("/delete/:id",adminMiddleware, deleteProblem);


// problemRouter.get("/problemById/:id",userMiddleware,getProblemById);
// problemRouter.get("/getAllProblem",userMiddleware, getAllProblem);
// problemRouter.get("/problemSolvedByUser",userMiddleware, solvedAllProblembyUser);
// problemRouter.get("/submittedProblem/:pid",userMiddleware,submittedProblem);


// module.exports = problemRouter;

// // fetch
// // update
// // delete 
