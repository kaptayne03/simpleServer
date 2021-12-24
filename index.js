import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userModel from "./userSchema/userSchema.js"




const app = express()
const port = 9000
dotenv.config()
app.use(express.json())
app.use(cors())
const url = process.env.DB_URL

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully.......")
}).catch((error)=>{
    console.log(error)
})

app.post("/create",async(req,res)=>{
    const{first_name,last_name,date_of_birth,school}=req.body

    const createNewUser=await userModel.create({
        first_name,
        last_name,
        date_of_birth,
        school
    })
    if (createNewUser){
        return res.status(201).json({
            message:"user added successfully",
            data:createNewUser
        })
    }else{
        return res.status(204).json({
            message:"failed to add new user"
        })
    }
})

app.get("/",(req,res)=>{

    res.send("get all users")
})
app.get("/users",async(req,res)=>{
    const users=await userModel.find({});
    if(users){
        return res.status(200).json({
            message:"fetch all users from database",
            data:users
        })
    }else{
        return res.status(400).json({
            message:"failed to fetch all users from the database"
        })
    }
})

app.listen(port,()=>{
    console.log(`user server running at ${port}`)
})