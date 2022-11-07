const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    //to be changed later
    host: "localhost",
    user: "root",
    password: "password",
    database: "brdb"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res)=> {

    const address = req.body.address;
    const email = req.body.email;
    const duration = req.body.duration;
    const location = req.body.location;
    const height = req.body.height;
    const size = req.body.size;
    const image = req.body.image;

    const sqlINSERT = "INSERT INTO reports (address, email, duration, location, height, size, image) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlINSERT, [address, email, duration, location, height, size, image], (err, result)=> {
        console.log(result);
    })
});

app.get('/', (req, res)=> {
    console.log("received get");
    //res.send("Hello World, this is the Bee Rescue server");
});

//server port, change later
app.listen(3001, () => {
    console.log("Running on port 3001");
});