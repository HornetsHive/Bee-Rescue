const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const gmapsAPIKey = process.env.GMAPS_API_KEY;
//process.env...
//SQL server connection
const db = mysql.createConnection({
  //to be changed later
  host: process.env.MYSQL_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

//Set up nodemailer connection
//this email is not final
//-------------------------  add email user and pass to env file once finalized -----------------------------------
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
    return res.status(200).send("Action Successful");
  });
});

//SERVER POSTS//

//reports database insert
app.post("/insert", async (req, res) => {
  const conf_code = generateConfirmationCode();

  try {
    const coords = await getCoordinates(
      req.body.address + ", " + req.body.city + ", " + req.body.state + " " + req.body.zip,
      gmapsAPIKey
    );

    const sqlINSERT =
      "INSERT INTO reports (address, addressln2, city, state, zip, lat, lng, phone_no, fname, lname, email, duration, p_type, location, height, size, category, image, conf_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const insertReport = new Promise((resolve, reject) => {
      db.query(
        sqlINSERT,
        [
          req.body.address,
          req.body.addressln2,
          req.body.city,
          req.body.state,
          req.body.zip,
          coords.latitude,
          coords.longitude,
          req.body.phone_no,
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.duration,
          req.body.propertyType,
          req.body.propertyLoc,
          req.body.height,
          req.body.size,
          "normal",
          req.body.image,
          conf_code,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const result = await insertReport;
    console.log("Successfully inserted record");
    console.log(result);
    sendConfirmationEmail(req.body.email, req.body.fname, conf_code);
    return res.status(200).send("Insert Successful");
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("Failed to submit report");
  }
});

function sendConfirmationEmail(email, fname, conf_code) {
  //send confirmation email
  //################################# Change this link later! #########################################
  const confirmationLink =
    "http://45.33.38.54:3001/confirm-email?code=" + conf_code;
  const messagebody =
    "Hi " +
    fname +
    ",\n" +
    "Thank you for submitting your report. We will notify the beekeepers in your area, and you will receive a follow-up email when an available beekeeper claims your report.\n\n Important! Please click this link to confirm your report:\n" +
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
      return res.send(200).send("Action Successful");
    }
  });
}

async function getCoordinates(address, apiKey) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  ).catch((err) => {
    console.log(err);
    throw new Error("Failed to get coordinates");
  });
  const { results } = response.data;

  if (results.length > 0) {
    const { lat, lng } = results[0].geometry.location;
    console.log("lat: ", lat, "lng: ", lng);

    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("No coordinates found");
  }
}

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
        return res.status(200).send("Email confirmed");
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
    subject: "Bee Rescue - Password Reset Code",
    text: messagebody,
  };

  transporter.sendMail(messageHeader, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
    res.status(200).send("Code Sent!\n" + res);
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

      //insert hashed password and salt into database
      const sqlINSERT =
        "INSERT INTO beekeepers (email, pass, salt) VALUES (?, ?, ?);";
      db.query(sqlINSERT, [email, hash, salt], (err, result) => {
        if (err) return res.status(500).send(err.message);
        console.log(result);
        return res.status(200).send("Insert Successful");
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
      return res.status(200).send("Insert Successful");
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
      if (err) return res.status(500); //.send(err.message)
      console.log("qualifications updated");
      console.log(result);
      return res.status(200).send("Insert Successful");
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

      //update hashed password and salt into database
      const sqlUpdate =
        "UPDATE beekeepers SET pass = ?, salt = ? WHERE bk_id = ?;";
      db.query(sqlUpdate, [hash, salt, bk_id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        console.log(result);
        return res.status(200).send("Insert Successful");
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
    console.log(result);
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
      " as complete.\n\n Thank you for supporting our local beekeepers and ecosystem by using Bee Rescue. If you enjoyed your experience using Bee Rescue, please recommend us to your friends.";
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
    return res.status(200).send(result);
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
    
    return res.status(200).send("Report has been abandoned.");
  });

  console.log("Report has been abandoned.");
});

// Remove the report and mark it as unsuccessful
app.post("/remove_report", (req, res) => {
  const r_id = req.body.r_id;
  const reason = req.body.reason;
  console.log("Removing report #" + r_id);
  console.log("Reason: " + reason);

  // Mark report as complete
  const sqlUpdate = "UPDATE reports SET complete = true WHERE r_id = ?;";
  db.query(sqlUpdate, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
  });

  // Remove completed report from active reports
  const sqlDelete = "DELETE FROM reports WHERE r_id = ?;";
  db.query(sqlDelete, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
  });

  // Set success to false
  const sqlUpdate2 = "UPDATE report_archive SET success = false WHERE r_id = ?;";
  db.query(sqlUpdate2, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
  });

  console.log("Report has been removed.");
  return res.status(200).send("Report has been removed.");
});

app.use("/claim_report", (req, res) => {
  const r_id = req.body.r_id;
  const bk_id = req.body.bk_id;

  const sqlInsert = "INSERT INTO active_reports (bk_id, r_id) VALUES (?, ?)";
  db.query(sqlInsert, [bk_id, r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(result);
    return;
  });

  const sqlUpdate = "UPDATE reports SET active = true WHERE r_id = ?;";
  db.query(sqlUpdate, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(result);
    return;
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
    return res.status(200).send(result);
  });
});

//GET REALMS//

// Fetches a user email and bk_id from the Beekeepers table
app.get("/bk_user", (req, res) => {
  const email = req.query.email;

  const sqlQuery = "SELECT email, bk_id FROM beekeepers WHERE email = ?;";
  db.query(sqlQuery, [email], (err, result) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(result);
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
    return res.status(200).send("Action Successful");
  });
});

// Fetches ALL the Beekeeper information based on the email/password unique pair
//uses: login screen and preferences
//(for future make the login get call return just the bk_id
//and another get call for preferences return everything BUT email and pass)

app.get("/bk_get", (req, res) => {
  //MUST use query when making a get request to the database!
  const email = req.query.email;
  const pass = req.query.pass;

  //select the bk using the email then check the hashed password
  const sqlQuery = "SELECT * FROM beekeepers WHERE email = ?";
  db.query(sqlQuery, [email], (err, result) => {
    if (err) return res.status(500).send(err.message);
    try {
      //validate password
      //rehashes password using stored salt value and compares to hashed password in database
      bcrypt.hash(pass, result[0]["salt"], function (err, hash) {
        if (result[0]["pass"] == hash) {
          console.log("password verified");
          return res.status(200).send(result);
        } else return console.log("wrong password");
        //catch errors
        if (err) return console.log(err);
      });
    } catch (err) {
      console.log("email not found");
    }
  });
});

app.get("/bk_getUser", (req, res) => {
  const bk_id = req.query.bk_id;
  const sqlQuery = "SELECT * FROM beekeepers WHERE bk_id = ?;";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(result);
  });
});

// Fetch bee reports to display on the app
app.get("/bk_appReports", (req, res) => {
  const sqlQuery =
    "SELECT * FROM reports WHERE active = false AND confirmed = true;";
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(result);
  });
});

// Fetches reports a beekeeper has claimed for MyReports for a report to show here active must be true
app.get("/bk_claimedReports", (req, res) => {
  const bk_id = req.query.bk_id;

  const sqlQuery =
    "SELECT * FROM reports JOIN active_reports ON reports.r_id = active_reports.r_id WHERE reports.active = true AND active_reports.bk_id = ?;";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(result);
    return res.status(200).send(result);
  });
});

// Fetches reports a beekeeper has completed for MyReports
app.get("/bk_completedReports", (req, res) => {
  const bk_id = req.query.bk_id;

  const sqlQuery = "SELECT * FROM report_archive WHERE bk_id = ?";
  db.query(sqlQuery, [bk_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log(res);
    return res.status(200).send(result);
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
    return res.status(200).send("Insert Successful");
  });
});

//fetches all info for a specifc report
app.get("/report_data", (req, res) => {
  const r_id = req.query.r_id;

  const sqlQuery = "SELECT * FROM reports WHERE r_id = ?;";
  db.query(sqlQuery, [r_id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(result);
  });
});

//server port, change later
const server = app.listen(3001, () => {
  console.log("Running on port 3001");
});

module.exports = {
  app,
  server,
  closeServer: () => {
    server.close();
  },
};
