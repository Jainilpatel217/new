
const {getLanguageById,submitBatch,submitToken} = require("../utils/ProblemUtility");
const Problem = require("../models/problem")
const User=require("../models/user");
const Submission=require('../models/Submission')
const SolutionVideo = require("../models/solutionVideo")




const CreateProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);


       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }
      
      //   const submitResult = await submitBatch(submissions);

      //   const resultToken = submitResult.map((value)=> value.token);

      //   // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
      //  const testResult = await submitToken(resultToken);

      // //  console.log(testResult);

      //  for(const test of testResult){
      //   if(test.status_id!=3){
      //    return res.status(400).send("Error Occured");
      //   }
      //  }

      // }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}



const Updateproblem=async(req,res)=>{
  const {id}=req.params

        const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;

      
    try{
   if(!id){
    return res.status(400).send("missing ID field")
   }

   const Dsaproblem=await Problem.findById(id);
   if(!Dsaproblem){
    return res.status(404).send('id is not present in server')
   }
      

      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        // console.log(submissions)
        const submitResult = await submitBatch(submissions);
   
        

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);

      //  console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }


      }

     const newProblem=await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true})

     res.status(200).send(newProblem)
    }
  catch(err){

    res.send(500).status("error:"+err)

  }
}


const Deleteproblem=async(req,res)=>{

  const {id}=req.params;

  try{

    if(!id){
      return res.status(400).send("id is missing")
    }

   const deletedproblem=await Problem.findByIdAndDelete(id)

   if(!deletedproblem)
    return res.status(404).send("problem is missing")


   res.status(200).send("successfully deleted")
  }

  catch(err){

    res.status(500).send("error"+err)

  }


}

const getproblemById=async(req,res)=>{
  const {id}=req.params;

  try{

    if(!id){
      return res.status(400).send("id is missing")
    }

 
const getProblem=await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution')
//-hiddentestcases

if(!getProblem)
  return res.status(404).send("problem is missing")
   


const videos = await SolutionVideo.findOne({problemId:id});

   if(videos){    
    const responseData={
      ...getProblem.toObject(),
          
  secureUrl : videos.secureUrl,
   thumbnailUrl :videos.thumbnailUrl,
   duration :videos.duration

    }
 
   return res.status(200).send(responseData);
   }

   //backend frontend ne response kare 6e

   res.status(200).send(getProblem)
  }

  catch(err){

    res.status(500).send("error"+err)

  }

}

const getAllProblem=async(req,res)=>{


  try{

   

const getProblem=await Problem.find({}).select('_id title difficulty tags')

if(getProblem.length==0)
    return res.status(404).send("problem is missing")
   

   res.status(200).send(getProblem)
  }

    catch(err){

    res.status(500).send("error"+err)

  }

}

const solvedAllproblembyuser=async(req,res)=>{

  try{
    // req.result==user detail

          // const count=req.result.problemsolved.length;
          // res.status(200).send(count);


          const userId=req.result._id;
          // const user=await User.findById(userId).populate("problemsolved")
           const user=await User.findById(userId).populate({
                path:"problemsolved",
                select:"_id title difficulty tags"
           })
          res.status(200).send(user.problemsolved)

  }

  catch(err){
    res.status(500).send("server error")
  }
}

const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.result._id;
    // console.log("hello")
    const problemId = req.params.pid;

   const ans = await Submission.find({userId,problemId});
  
  if(ans.length==0)
    res.status(200).send("No Submission is persent");
    // console.log("hello")

  res.status(200).send(ans);
    // console.log("hello")

  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
}
  

module.exports = {CreateProblem,Updateproblem,Deleteproblem,getproblemById,getAllProblem,solvedAllproblembyuser,submittedProblem};


