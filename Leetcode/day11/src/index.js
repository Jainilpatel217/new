const express=require('express')
const app=express()
require('dotenv').config()
const main = require('./config/db')
const cookieparser=require('cookie-parser')
const authrouter=require("./routes/userauth");
const redisclient = require('./config/redis')
const problemRouter=require("./routes/ProblemCreator")
const submitRouter=require("./routes/submit")
const cors=require('cors')
const aiRouter=require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))


app.use(express.json())
app.use(cookieparser())


app.use('/user',authrouter)
app.use('/problem',problemRouter)
app.use('/submission',submitRouter)
app.use('/ai',aiRouter)
app.use("/video",videoRouter);


// main()
// .then(async ()=>{
//     app.listen(process.env.PORT,()=>{
//     console.log("server listening at port number:"+process.env.PORT);
// })
// })
// .catch(err=>console.log("error"))


const Initializeconnection=async()=>{

    try{

        await Promise.all([main(),redisclient.connect()])
        console.log("DB is coonected");
         app.listen(process.env.PORT,()=>{
    console.log("server listening at port number:"+process.env.PORT)
    })

}

    catch(err){

        console.log("error"+err.message)

    }
}

Initializeconnection();