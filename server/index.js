const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  //to be changed later //someone changed the database name from brdb to beedb and it really messed me up
  host: "localhost",
  user: "root",
  password: "password",
  database: "brdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//POST REALMS//

//reports database insert
app.post("/api/insert", (req, res) => {
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const propertyType = req.body.propertyType;
  const propertyLocation = req.body.propertyLoc;
  const duration = req.body.duration;
  const height = req.body.height;
  const size = req.body.size;
  const image = req.body.image;

  const sqlINSERT =
    "INSERT INTO reports (address, city, fname, lname, email, duration, p_type, location, height, size, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlINSERT,
    [
      address,
      city,
      fname,
      lname,
      email,
      duration,
      propertyType,
      propertyLocation,
      height,
      size,
      "normal",
      image,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully inserted record");
        console.log(result);
      }
    }
  );
});

// Inserts a Beekeeper user
app.post("/api/bk_insert", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const pass = req.body.pass;

  const sqlINSERT =
    "INSERT INTO BEEKEEPERS (bk_id, fname, lname, email, phone_no, address, city, zip, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlINSERT,
    [DEFAULT, fname, lname, email, phone_no, address, city, zip, pass],
    (err, result) => {
      console.log(result);
    }
  );
});

// Updates a Beekeeper user's Qualifications where the bk_id is equal to the email/pass combo corresponding to the bk_id of the Beekeepers
app.post("/api/bk_qualif_update", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  const ground_swarms = req.body.ground_swarms;
  const valve_or_water_main = req.body.valve_or_water_main;
  const shrubs = req.body.shrubs;
  const low_tree = req.body.low_tree;
  const mid_tree = req.body.mid_tree;
  const tall_tree = req.body.tall_tree;
  const fences = req.body.fences;
  const low_structure = req.body.low_structure;
  const mid_structure = req.body.mid_structure;
  const chimney = req.body.chimney;
  const interior = req.body.interior;
  const cut_or_trap_out = req.body.cut_or_trap_out;
  const traffic_accidents = req.body.traffic_accidents;
  const bucket_w_pole = req.body.bucket_w_pole;
  // LADDER IS OF TYPE INT
  const ladder = req.body.ladder;
  const mechanical_lift = req.body.mechanical_lift;
  // TODO: Update query, consider refactoring tables to remove bk_id and only include email/pass as primary key
  //const sqlINSERT = "UPDATE QUALIFICATIONS SET "
});

//Posts update to mark report as complete TRIGGER WARNING this will delete this report from reports, if you want to find it again it will be in report_archive
app.post("/api/complete_report", (req, res) => {
  const r_id = req.body.r_id;
  //const active = req.body.active;

  const sqlUpdate = "UPDATE reports SET active = false WHERE r_id = ?;";

  db.query(sqlUpdate, [r_id], (err, result) => {
    console.log(result);
    }
  );
});

//GET REALMS//

// Fetches a user email from the Beekeepers table
app.get("/api/bk_user", (req, res) => {
  const email = req.body.email;

  const sqlQuery = "SELECT email FROM BEEKEEPERS WHERE email = ?;";
  db.query(sqlQuery, [email], (err, result) => {
    console.log(result);
  });
});

// Fetches the user email/password unique pair based on that pairing
app.get("/api/bk_pass", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  const sqlQuery =
    "SELECT email, pass FROM BEEKEEPERS WHERE email = ? AND pass = ?;";
  db.query(sqlQuery, [email, pass], (err, result) => {
    console.log(result);
  });
});

// Fetches the entire Beekeeper user entry based on the email/password unique pair
app.get("/api/bk_get", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  const sqlQuery =
    "SELECT * FROM BEEKEEPERS NATURAL JOIN QUALIFICATIONS WHERE email = ? AND pass = ?;";
  db.query(sqlQuery, [email, pass], (err, result) => {
    console.log(result);
  });
});
// Fetch bee reports to display on the app
app.get("/api/bk_appReports", (req, res) => {
  const r_id = req.body.r_id;
  const address = req.body.address;
  const email = req.body.email;
  const pass = req.body.pass;
  const duration = req.body.duration;
  const propertyLocation = req.body.propertyLoc;
  const height = req.body.height;
  const size = req.body.size;
  const image = req.body.image;
  const category = req.body.category;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const city = req.body.city;
  const propertyType = req.body.propertyType;
  const weight = req.body.weight;
  const reportDate = req.body.reportDate;
  const active = req.body.active;

  const sqlQuery = "SELECT * FROM reports";
  db.query(
    sqlQuery,
    [
      r_id,
      address,
      email,
      pass,
      duration,
      propertyLocation,
      height,
      size,
      image,
      category,
      fname,
      lname,
      city,
      propertyType,
      weight,
      reportDate,
      active,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});

app.get("/", (req, res) => {
  console.log("received get");
  //res.send("Hello World, this is the Bee Rescue server");
});

//server port, change later
app.listen(3001, () => {
  console.log("Running on port 3001");
});
