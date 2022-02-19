const express = require("express");
const app = express();
const body_parser = require('body-parser')
const fs = require('fs');
const cors = require('cors')
require("dotenv").config()



// CORS-enabled
app.use(cors());

// Middleware
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use('/Error', express.static('Error'));


const UserRoter = require("./Router/userRouter")
const UserAuth = require("./Controllar/userController")

// DATABASE CONNECTION
const db = require('./config/database')

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


app.use('/user', (req, res) => {
    res.send('Server Is Runinig')
})
// Testing Database
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    // .catch((error) => { console.error('Unable to connect to the database:', error); })
    .catch((error) => {
        fs.writeFile('Error\\log.txt', 'Unable to connect to the database: ' + error, function (err) {
            if (err) return console.log(err);
            console.error('Unable to connect to the database:', error);
        });
    })
    // E:\\qtech_task\backend\Error

// Routing
app.use("/api", UserRoter)
app.use("/api", UserAuth)


// Error Handling
app.use((error, req, res, next) => {
    res.send(error.message + "");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`app is run on port ${PORT}`)
})