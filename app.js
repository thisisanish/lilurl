const express = require('express'),
    app = express(),
    port = process.env.PORT || 4100,
    ejs = require("ejs"),
    bodyParser = require('body-parser');
    connectDB = require('./config/db');
// connect DB
connectDB()

// All Sets
    app.set('view engine', 'ejs');
    app.use(express.json({extended:false}))
    app.use('/',require('./routes/index'));
    app.use('/api/url', require('./routes/url'))


// Core Functionality

    app.get("/",(res,req)=>{
        console.log("yolo");
        req.send("yolo")
    })





app.listen(port,()=>console.log(`running on ${port}`))