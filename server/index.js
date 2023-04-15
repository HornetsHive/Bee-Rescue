const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

//SQL server connection
const db = mysql.createConnection({
  //to be changed later
  host: process.env.MYSQL_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

//Set up nodemailer connection
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "BeeRescuePostmaster@outlook.com",
    pass: "CSC191testpass",
  },
});

function generateConfirmationCode() {
  return crypto.randomBytes(20).toString("hex");
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/mailtest", (req, res) => {
  const mailoptionstest = {
    from: "BeeRescuePostmaster@outlook.com",
    to: "BeeRescuePostmaster@outlook.com",
    subject: "Sending email with nodemailer",
    text: "Hello world",
  };
  transporter.sendMail(mailoptionstest, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
  });
});

//SERVER POSTS//

//reports database insert
app.post("/insert", (req, res) => {
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

  const phone_no = req.body.phone_no;
  const conf_code = generateConfirmationCode();

  const sqlINSERT =
    "INSERT INTO reports (address, city, zip, phone_no, fname, lname, email, duration, p_type, location, height, size, category, image, conf_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlINSERT,
    [
      address,
      city,
      zip,
      phone_no,
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
      conf_code,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to submit to database");
      } else {
        console.log("Successfully inserted record");
        console.log(result);
        res.status(200).send("Insert Succesful");

        //send confirmation email
        //################################# Change this link later! #########################################
        const confirmationLink =
          "http://45.33.38.54/confirm-email?code=" + conf_code;
        const messagebody =
          "Hi " +
          fname +
          ",\n" +
          "Thank you for submitting your report. We will notifiy the beekeepers in your area, and you will recieve a follow-up email when an available beekeeper claims your report.\n\n Important! Please click this link to confirm your report:\n" +
          confirmationLink;
        const confirmReportOptions = {
          from: "BeeRescuePostmaster@outlook.com",
          to: email,
          subject: "Bee Rescue - Please Confirm Your Report",
          text: messagebody,
        };

        transporter.sendMail(confirmReportOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Sent: " + info.response);
          }
        });
      }
    }
  );
});

// Handle the confirmation link
app.get("/confirm-email", (req, res) => {
  const code = req.query.code;
  db.query("SELECT * FROM reports WHERE conf_code = ?", [code], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    if (rows.length === 0) {
      return res.status(400).send("Invalid confirmation code");
    }
    const report = rows[0];
    db.query(
      "UPDATE reports SET confirmed = true WHERE r_id = ?",
      [report.r_id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        res.send("Email confirmed");
      }
    );
  });
});

//send unique code for password reset
app.post("/sendCode", (req, res) => {
  const email = req.body.email;
  const code = req.body.code;

  //send email with code
  const messagebody =
    "Here is a one time use code to reset your password: " + code;
  const messageHeader = {
    from: "BeeRescuePostmaster@outlook.com",
    to: email,
    subject: "Bee Rescue - Pasword Reset Code",
    text: messagebody,
  };

  transporter.sendMail(messageHeader, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
  });
});

//Inserts a new Beekeeper
app.post("/bk_insert", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return console.log(err);
    bcrypt.hash(pass, salt, function (err, hash) {
      if (err) return console.log(err);
      console.log(pass); //only for testing!
      console.log(hash); //only for testing!
      console.log(salt); //only for testing!

      //insert hashed password and salt into database
      const sqlINSERT =
        "INSERT INTO beekeepers (email, pass, salt) VALUES (?, ?, ?);";
      db.query(sqlINSERT, [email, hash, salt], (err, result) => {
        if (err) return res.status(500).send(err.message);
        console.log(result);
        res.status(200).send("Insert Succesful");
      });
    });
  });
});

// Update Beekeeper table with personal info
app.post("/bk_update", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const bk_id = req.body.bk_id;

  const sqlUPDATE =
    "UPDATE beekeepers SET fname = ?, lname = ?, phone_no = ?, address = ?, city = ?, zip = ? WHERE bk_id = ?;";
  db.query(
    sqlUPDATE,
    [fname, lname, phone_no, address, city, zip, bk_id],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      console.log(result);
      res.status(200).send("Insert Succesful");
    }
  );
});

// Updates a Beekeeper user's Qualifications based on the bk_id
app.post("/bk_qualif_update", (req, res) => {
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
  const ladder = req.body.ladder; // LADDER IS OF TYPE INT
  const mechanical_lift = req.body.mechanical_lift;
  const bk_id = req.body.bk_id;
  const sqlUPDATE =
    "UPDATE qualifications SET ground_swarms = ?, valve_or_water_main = ?, shrubs = ?, low_tree = ?, mid_tree = ?, tall_tree = ?, fences = ?, low_structure = ?, mid_structure = ?, chimney = ?, interior = ?, cut_or_trap_out = ?, traffic_accidents = ?, bucket_w_pole = ?, ladder = ?, mechanical_lift = ? WHERE bk_id = ?;";
  db.query(
    sqlUPDATE,
    [
      ground_swarms,
      valve_or_water_main,
      shrubs,
      low_tree,
      mid_tree,
      tall_tree,
      fences,
      low_structure,
      mid_structure,
      chimney,
      interior,
      cut_or_trap_out,
      traffic_accidents,
      bucket_w_pole,
      ladder,
      mechanical_lift,
      bk_id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      console.log("qualifications updated");
      console.log(result);
      res.status(200).send("Insert Succesful");
    }
  );
});

//updates bk password and salt using the confirmed id
app.post("/bk_pass_update", (req, res) => {
  const pass = req.body.pass;
  const bk_id = req.body.bk_id;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return console.log(err);
    bcrypt.hash(pass, salt, function (err, hash) {
      if (err) return console.log(err);

      console.log(pass); //only for testing!
      console.log(hash); //only for testing!
      console.log(salt); //only for testing!

      //update hashed password and salt into database
      const sqlUpdate =
        "UPDATE beekeepers SET pass = ?, salt = ? WHERE bk_id = ?;";
      db.query(sqlUpdate, [hash, salt, bk_id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        console.log(result);
        res.status(200).send("Insert Succesful");
      });
    });
  });
});

//Posts update to mark report as complete TRIGGER WARNING this will delete this report from reports, if you want to find it again it will be in report_archive
app.post("/complete_report", (req, res) => {
  const r_id = req.body.r_id;
  //const active = req.body.active;

  //mark report as complete
  const sqlUpdate = "UPDATE reports SET complete = true WHERE r_id = ?;";
  db.query(sqlUpdate, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
  });

  //get report details for email
  const sqlReportInfo = "SELECT email, address FROM reports WHERE r_id = ?;";
  db.query(sqlReportInfo, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    const details = result[0]; // assuming only one row is returned
    console.log("Details: " + details);

    //send email update
    const messagebody =
      "Your beekeeper has marked your report at " +
      details.address +
      " as complete.\n\n Thank you for using Bee Rescue and supporting our beekeepers and local ecosystem. If you enjoyed your experience using Bee Rescue, please recommend us to your friends.";
    const messageHeader = {
      from: "BeeRescuePostmaster@outlook.com",
      to: details.email,
      subject: "Bee Rescue - Your Report Has Been Completed",
      text: messagebody,
    };

    transporter.sendMail(messageHeader, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
  });

  //remove completed report from active reports
  const sqlDelete = "DELETE FROM reports WHERE r_id = ?;";
  db.query(sqlDelete, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
  });
});

// Delete the report from active_reports table, and set report.active to FALSE
app.post("/abandon_report", (req, res) => {
  const r_id = req.body.r_id;
  console.log("Abandoning report #" + r_id);

  const sqlDelete = "DELETE FROM active_reports WHERE r_id = ?;";
  db.query(sqlDelete, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
  });

  const sqlUpdate = "UPDATE reports SET active = FALSE WHERE r_id = ?;";
  db.query(sqlUpdate, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
  });

  console.log("Report has been abandoned.");
  res.send("Report has been abandoned.");
});

app.post("/claim_report", (req, res) => {
  const r_id = req.body.r_id;
  const bk_id = req.body.bk_id;

  const sqlInsert = "INSERT INTO active_reports (bk_id, r_id) VALUES (?, ?)";
  db.query(sqlInsert, [bk_id, r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
    res.send(result);
  });

  const sqlUpdate = "UPDATE reports SET active = true WHERE r_id = ?;";
  db.query(sqlUpdate, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
  });

  //get report details for email
  const sqlReportInfo = "SELECT email, address FROM reports WHERE r_id = ?;";
  db.query(sqlReportInfo, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    const details = result[0]; // assuming only one row is returned
    console.log("Details: " + details);

    //send email update
    const messagebody =
      "A beekeeper has claimed your report at " +
      details.address +
      ".\n\n Expect them to arrive soon!";
    const messageHeader = {
      from: "BeeRescuePostmaster@outlook.com",
      to: details.email,
      subject: "Bee Rescue - Your Report Has Been Claimed",
      text: messagebody,
    };

    transporter.sendMail(messageHeader, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
  });
});

//GET REALMS//

// Fetches a user email and bk_id from the Beekeepers table
app.get("/bk_user", (req, res) => {
  const email = req.query.email;

  const sqlQuery = "SELECT email, bk_id FROM beekeepers WHERE email = ?;";
  db.query(sqlQuery, [email], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).send(result);
  });
});

// Fetches the user email/password unique pair based on beekeepers ID
//not being used as of now
app.get("/bk_pass", (req, res) => {
  const bk_id = req.query.bk_id;

  const sqlQuery = "SELECT email, pass FROM beekeepers WHERE bk_id = ?";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(result);
    res.status(200).send(result);
  });
});

// Fetches ALL the Beekeeper information based on the email/password unique pair
//uses: login screen and preferences
//(for future make the login get call return jsut the bk_id
//and another get call for preferences reurn everythihng BUT email and pass)

//TODO: small bug where if user hits login it does not get confirmed on the app until button is pressed again
app.get("/bk_get", (req, res) => {
  //MSUT use query when making a get request to the database!
  const email = req.query.email;
  const pass = req.query.pass;

  //select the bk using the email then check the hashed password
  const sqlQuery = "SELECT * FROM beekeepers WHERE email = ?";
  db.query(sqlQuery, [email], (err, result) => {
    if (err) return res.status(500).send(err.message);
    try {
      //validate password
      //rehashes pasword using stored salt value and compares to hashed password in database
      bcrypt.hash(pass, result[0]["salt"], function (err, hash) {
        if (result[0]["pass"] == hash) {
          console.log("password verified");
          res.status(200).send(result);
        } else return console.log("wrong password");
        //catch errors
        if (err) return console.log(err);
      });
    } catch (err) {
      console.log("email not found");
    }
  });
});

// Fetch bee reports to display on the app
app.get("/bk_appReports", (req, res) => {
  const sqlQuery =
    "SELECT * FROM reports WHERE active = false AND confirmed = true;";
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
    res.status(200).send(result);
  });
});

// Feteches reports a beekeeper has claimed for MyReports for a report to show here active must be true
app.get("/bk_claimedReports", (req, res) => {
  const bk_id = req.query.bk_id;

  const sqlQuery =
    "SELECT * FROM reports JOIN active_reports ON reports.r_id = active_reports.r_id WHERE reports.active = true AND active_reports.bk_id = ?;";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
    res.status(200).send(result);
  });
});

// Feteches reports a beekeeper has completed for MyReports
app.get("/bk_completedReports", (req, res) => {
  const bk_id = req.query.bk_id;

  const sqlQuery = "SELECT * FROM report_archive WHERE bk_id = ?";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
    res.status(200).send(result);
  });
});

app.get("/debug-report", (req, res) => {
  const sqlINSERT =
    'INSERT INTO reports (address, city, zip, phone_no, fname, lname, email, duration, p_type, location, height, size, category, confirmed)\
   VALUES (\
    "123 Debug St",\
    "Debug",\
    "12345",\
    "1234567890",\
    "Dee",\
    "Bug",\
    "BeeRescuePostmaster@outlook.com",\
    "0",\
    "res_detached",\
    "ext_wall",\
    "low",\
    "small",\
    "normal",\
    true)';
  db.query(sqlINSERT, (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(result);
    res.status(200).send("Insert Succesful");
  });
});

//server port, change later
app.listen(3001, () => {
  console.log("Running on port 3001");
});

module.exports = app;