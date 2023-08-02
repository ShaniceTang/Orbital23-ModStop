require('dotenv').config()
console.log(process.env)

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(express.json())

//cors
app.use(cors({
    origin: ["http://localhost:3000", "https://modstop-frontend.onrender.com"]
}));

//will fire everytime a new request comes in
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then((client)=>{
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((error)=>{
        console.log(error)
    })


