require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Schedule = require("./models/schedule");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { MONGOOSE } = process.env;

mongoose.connect(MONGOOSE, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected successfully!");
});
db.on("error", err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sms", async (req, res) => {
  const twiml = new MessagingResponse();
  let message = "";

  const user = await User.findOne({ phoneNumber: req.body.From });

  if (!user) {
    const newUser = new User({
      phoneNumber: req.body.From
    });

    await newUser.save();
    message = "Greetings! This is SageExit Bot. Please enter your student id.";
  } else if (user.studentId.length == 0) {
    const schedule = await Schedule.findOne({ studentId: req.body.Body });
    if (!schedule) message = "Your id does not exist. Please try again.";
    else {
      await User.findOneAndUpdate(
        { phoneNumber: req.body.From },
        {
          $set: {
            studentId: req.body.Body
          }
        }
      );
    }
  } else {
    console.log(req.body.Body);
  }

  twiml.message(message);
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});
