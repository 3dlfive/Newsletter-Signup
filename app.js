//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singnup.html");
});

app.post('/', (req, res) => {
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var email = req.body.email;
  var userData = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName
    }
  }],};
 mailchimp.setConfig({
   apiKey: "15b70457ab52edd57880cb45a7c06fba-us2",
   server: "us2",
 });
 const run = async () => {
    const response = await mailchimp.lists.batchListMembers('ac49197229', userData );
    console.log(response);
  };
  run();

res.send("<p>Thanks for your submission</p>")
});





app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});


//api key
// 15b70457ab52edd57880cb45a7c06fba-us2

//List id
// ac49197229
