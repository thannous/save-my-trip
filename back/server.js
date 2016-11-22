var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var saveMyTrip = require('./save-my-trip');


var app = express();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log("App now running on port", 8080);
  saveMyTrip(app);
});