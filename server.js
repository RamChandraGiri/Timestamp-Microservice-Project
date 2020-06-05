// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint hit with no additional information
app.get("/api/timestamp", function (req, res) {
  res.json({unix: Date.now(), utc: Date()});
});

// Required API endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {
  // Provided date string
  const dateString = req.params.date_string;  
  // Create date object from date_string
  let dateObject = new Date(dateString);
  // Check if parsing of date results in Invalid Date.
  if (dateObject.toString() === "Invalid Date") {
    // If parsing results in Invalid Date then find out if it is Unix Time
    // by creating a new date object by parsing dateString into integer
    dateObject = new Date(parseInt(dateString));
  }
  // Finally check if parsing results in Invalid Date.
  if (dateObject.toString() === "Invalid Date") {       
        res.json({ error: "Invalid Date" });
  } else {
        res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
  }
});
  
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});