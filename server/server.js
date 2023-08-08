const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const userRoutes=require("./routes/userRoutes")

const app=express()
app.use(cors())
app.use(express.json())

const uri="mongodb+srv://cinflex:cinflexpassword@cinflex.vgfk5az.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
    console.log("here")
    try {
         await mongoose.connect(uri.toString())
         console.log("connected to mongodb")

    } catch (error) {
        console.error(error)
    }
}
connect()

app.use("/api/user",userRoutes)
app.listen(8000,console.log("server started "))
