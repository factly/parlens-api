// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var ls_questions = fs.readFileSync('./ls_questions_with_ministers.json');
var ls_members = fs.readFileSync('./ls_16_member_list.json');
var rs_members = fs.readFileSync('./rs_member_list.json');

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/lok_sabha_questions', function(request, response) {
  var data = JSON.parse(ls_questions);
  response.send(JSON.stringify(data));
});

app.get('/lok_sabha_members', function(request, response) {
  var data = JSON.parse(ls_members);
  response.send(JSON.stringify(data));
});

app.get('/rajya_sabha_members', function(request, response) {
  var data = JSON.parse(rs_members);
  response.send(JSON.stringify(data));
});
// listen for requests :)
var listener = app.listen(9000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
