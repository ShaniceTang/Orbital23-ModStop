require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const cors = require('cors')

//express app
const app = express()

//middleware
const allowedOrigins = ['https://orbital23-mod-stop1-frontend.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        console.log('vercel allowed')
        callback(null, true);
      } else {
        console.log('vercel not allowed')
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

//will fire everytime a request comes in
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




