const Submission=require('../models/Submission')
const Problem=require('../models/problem')
const {getLanguageById,submitBatch,submitToken}=require('../utils/ProblemUtility')
// const Problem = require("../models/problem");
// const Submission = require("../models/submission");
const User = require("../models/user");
// const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");


// // const submitCode=async(req,res)=>{

// // try{

// //     const userId=req.result._id;
// //     const problemId=req.params.id;
// //     const {code,language}=req.body;

// //     if(!userId||!code||!problemId||!language)
// //            return res.status(400).send("some field missing");

// //     //fetch the problem from database

// //    const problem= Problem.findById(problemId);
// //    //testcases(hidden)

// // const submittedResult= await Submission.create({
// //     userId,
// //     problemId,
// //     language,
// //     code,
// //     testCasesPassed:0,
// //     status:'pending',
// //     testCasesTotal:Problem.hiddenTestCases.length

// // })

// // //judge0 ko code submit karna hai

// //    const languageId = getLanguageById(language);

// //        const submissions =Problem.hiddenTestCases.map((testcase)=>({
// //             source_code:completeCode,
// //             language_id: languageId,
// //             stdin: testcase.input,
// //             expected_output: testcase.output
// //         }));

// //        const submitResult = await submitBatch(Submission);

// //         const resultToken = submitResult.map((value)=> value.token);

// //       const testResult = await submitToken(resultToken);

// //       //update
// //       let testCasesPassed=0;
// //       let runtime=0;
// //       let memory=0;
// //       let status='accepted'
// //       let errormessage=null

// //       for(const test of testResult){
// //         if(test.status_id==3){
// //             testCasesPassed++;
// //             runtime=runtime+parseFloat(test.time);
// //             memory=Math.max(memory,test.memory)
// //         }
// //         else{

// //       if(test.status_id==4){
// //         status='error'
// //         errormessage=test.stderr
// //       }  
// //       else{
// //         status='wrong'
// //         errormessage=test.stderr

// //       }

// //         }
// //       }

// //       //store the result in database

// //       submittedResult.status=status;
// //       submitResult.testCasesPassed=testCasesPassed
// //       submittedResult.errorMessage=errormessage
// //       submittedResult.runtime=runtime
// //       submitResult.memory=memory

// //       await submittedResult.save()

// //       res.status(201).send('submitted')

// // }

// // catch(err){

// //     res.status(500).send("internal server error"+err)
    
// // }

// // }

// // module.exports=submitCode;



// const submitCode = async (req,res)=>{
   
//     // 
//     try{
//        const userId = req.result._id;
//        const problemId = req.params.id;

//        const {code,language} = req.body;

//       if(!userId||!code||!problemId||!language)
//         return res.status(400).send("Some field missing");

//     //    Fetch the problem from database
//        const problem =  await Problem.findById(problemId);
//     //    testcases(Hidden)

//     //   Kya apne submission store kar du pehle....
//     const submittedResult = await Submission.create({
//           userId,
//           problemId,
//           code,
//           language,
//           status:'pending',
//           testCasesTotal:problem.hiddenTestCases.length
//         })



//     //    Judge0 code ko submit karna hai

//     const languageId = getLanguageById(language);

//     const submissions = problem.hiddenTestCases.map((testcase)=>({
//         source_code:code,
//         language_id: languageId,
//         stdin: testcase.input,
//         expected_output: testcase.output
//     }));


//     const submitResult = await submitBatch(submissions);
    
//     const resultToken = submitResult.map((value)=> value.token);

//     const testResult = await submitToken(resultToken);
    

//     // submittedResult ko update karo
//     let testCasesPassed = 0;
//     let runtime = 0;
//     let memory = 0;
//     let status = 'accepted';
//     let errorMessage = null;


//     for(const test of testResult){
//         if(test.status_id==3){
//            testCasesPassed++;
//            runtime = runtime+parseFloat(test.time)
//            memory = Math.max(memory,test.memory);
//         }else{
//           if(test.status_id==4){
//             status = 'error'
//             errorMessage = test.stderr
//           }
//           else{
//             status = 'wrong'
//             errorMessage = test.stderr
//           }
//         }
//     }


//     // Store the result in Database in Submission
//     submittedResult.status   = status;
//     submittedResult.testCasesPassed = testCasesPassed;
//     submittedResult.errorMessage = errorMessage;
//     submittedResult.runtime = runtime;
//     submittedResult.memory = memory;

//     await submittedResult.save();

//     //problem id ko insert karege userschema ke problemsolved me if not present there
//     //req.result ke andar user information
//    if(!req.result.problemsolved.includes(problemId)){
//     req.result.problemsolved.push(problemId)
//     await req.result.save()
//    }

//     res.status(201).send(submittedResult);
       
//     }
//     catch(err){
//       res.status(500).send("Internal Server Error "+ err);
//     }

// }

// //run code

// const runCode=async(req,res)=>{

//    try{
//        const userId = req.result._id;
//        const problemId = req.params.id;

//        const {code,language} = req.body;

//       if(!userId||!code||!problemId||!language)
//         return res.status(400).send("Some field missing");

//     //    Fetch the problem from database
//        const problem =  await Problem.findById(problemId);
//     //    testcases(Hidden)

//     //    Judge0 code ko submit karna hai

//     const languageId = getLanguageById(language);

//     const submissions = problem.visibleTestCases.map((testcase)=>({
//         source_code:code,
//         language_id: languageId,
//         stdin: testcase.input,
//         expected_output: testcase.output
//     }));


//     const submitResult = await submitBatch(submissions);
    
//     const resultToken = submitResult.map((value)=> value.token);

//     const testResult = await submitToken(resultToken);

//     res.status(201).send(testResult)
       
//     }
//     catch(err){
//       res.status(500).send("Internal Server Error "+ err);
//     }
// }

// module.exports = {submitCode,runCode};



//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',









const submitCode = async (req,res)=>{
   
    // 
    try{
      // console.log("hello")
       const userId = req.result._id;
       const problemId = req.params.id;

       let {code,language} = req.body;
            //  console.log("hello")


      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");
      

      if(language==='cpp')
        language='c++'
      
      console.log(language);
      
    //    Fetch the problem from database
       const problem =  await Problem.findById(problemId);
    //    testcases(Hidden)
    
    //   Kya apne submission store kar du pehle....
    const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
     })

    //    Judge0 code ko submit karna hai
    
    const languageId = getLanguageById(language);
   
    const submissions = problem.hiddenTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }));

    
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    

    // submittedResult ko update karo
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;
      // console.log("hello")


    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = 'error'
            errorMessage = test.stderr
          }
          else{
            status = 'wrong'
            errorMessage = test.stderr
          }
        }
    }

      // console.log("hello")

    // Store the result in Database in Submission
    submittedResult.status   = status;
          // console.log("hello1")

    submittedResult.testCasesPassed = testCasesPassed;
              // console.log("hello1")

    
    submittedResult.errorMessage = errorMessage;
              // console.log("hello1")

    submittedResult.runtime = runtime;
              // console.log("hello1")

    submittedResult.memory = memory;
              // console.log("hello1")


    await submittedResult.save();
              // console.log("hello1")

    
    // ProblemId ko insert karenge userSchema ke problemSolved mein if it is not persent there.
    
    // req.result == user Information
  if(!req.result.problemsolved.includes(problemId)){
    req.result.problemsolved.push(problemId)
    await req.result.save()
   }

    
    // console.log("hello")
    const accepted = (status == 'accepted')
        // console.log("hello")

    res.status(201).json({
      accepted,
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory
    });
    // console.log("hello")
       
    }
    catch(err){
      res.status(500).send("Internal Server Error "+ err);
    }
}


const runCode = async(req,res)=>{
    
     // 
     try{
      const userId = req.result._id;
      const problemId = req.params.id;

      let {code,language} = req.body;

     if(!userId||!code||!problemId||!language)
       return res.status(400).send("Some field missing");

   //    Fetch the problem from database
      const problem =  await Problem.findById(problemId);
   //    testcases(Hidden)
      if(language==='cpp')
        language='c++'

   //    Judge0 code ko submit karna hai

   const languageId = getLanguageById(language);

   const submissions = problem.visibleTestCases.map((testcase)=>({
       source_code:code,
       language_id: languageId,
       stdin: testcase.input,
       expected_output: testcase.output
   }));


   const submitResult = await submitBatch(submissions);
   
   const resultToken = submitResult.map((value)=> value.token);

   const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }

   
  
   res.status(201).json({
    success:status,
    testCases: testResult,
    runtime,
    memory
   });
      
   }
   catch(err){
     res.status(500).send("Internal Server Error "+ err);
   }
}


module.exports = {submitCode,runCode};



//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',


// User.findByIdUpdate({
// })

//const user =  User.findById(id)
// user.firstName = "Mohit";
// await user.save();