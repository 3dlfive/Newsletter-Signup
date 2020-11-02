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
    }],
  };
  mailchimp.setConfig({
    apiKey: "7311a6c47b597bf070e36a3e1b3cda7f-us2",
    server: "us2",
  });
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers('ac49197229', userData);
//checking
    if (response.error_count > 0) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
    console.log(response.error_count);
    console.log(response);};
  run();

});
//redirection to home page
app.post("/failure",(req, res)=>{
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000.");
});
