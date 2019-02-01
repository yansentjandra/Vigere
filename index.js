const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const Jobs = './models/Jobs';

var input;

const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Vigere',
  port: '8889'
});

connection.connect(function (err) {
  if(err) throw err;
  console.log("Connected");
});

connection.query('SELECT * FROM Job ORDER BY name asc', (err, res, fields) => {
  if(err) throw err;
  // console.log(res);
  // console.log(fields);
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('/', (req,res) => {
  res.status(200).sendFile(__dirname + '/client/public/index.html');
});

app.get('/api/result', (req, res) => {
  const result = {
    firstName: "Stephen",
    lastName: "Curry"
  }
  res.json(result);
  console.log(Jobs.query('SELECT * FROM Job'));
});

app.post('/api/search', (req, res) => {
  let keyword = req.body.keyword;
  let location = req.body.location;
  let queryString = "";

  if (keyword == "" && location =="") {
    queryString = "SELECT * FROM Job";
  }
  else if (keyword == "") {
    // keyword = "*"
    queryString = "SELECT * FROM Job WHERE location = '" + location +"'";
  }
  else if (location == "") {
    // location = "*"
    queryString = "SELECT * FROM Job WHERE name = '" + keyword + "'";
  }else {
    queryString = "SELECT * FROM Job WHERE name = '" + keyword + "' AND location = '" + location +"'";
  }

  console.log(req);
  console.log(res);
  console.log(keyword);
  console.log(location);
  console.log(queryString);
  connection.query(queryString, (err, result, fields) => {
    if(err) throw err;
    // console.log(res);
    // console.log(fields);
    res.send(result)
    // res.redirect('/client/public/job.html');
    // console.log(result)
    // show(result, res);
    // res.sendFile(path.join(__dirname + '/client/public/job.html'));

  });
});

app.get('/api/search', (req, res) => {
  let keyword = input.keyword;
  let location = input.location;
  let queryString = "";

  if (keyword == "" && location =="") {
    queryString = "SELECT * FROM Job";
  }
  else if (keyword == "") {
    // keyword = "*"
    queryString = "SELECT * FROM Job WHERE location = '" + location +"'";
  }
  else if (location == "") {
    // location = "*"
    queryString = "SELECT * FROM Job WHERE name = '" + keyword + "'";
  }else {
    queryString = "SELECT * FROM Job WHERE name = '" + keyword + "' AND location = '" + location +"'";
  }

  // console.log(queryString);
  connection.query(queryString, (err, result, fields) => {
    if(err) throw err;
    // console.log(res);
    // console.log(fields);
    res.send(result)
    // res.redirect('/client/public/job.html');
    // console.log(result)
    // show(result, res);
    // res.sendFile(path.join(__dirname + '/client/public/job.html'));

  });
});

app.post('/input', (req, res) => {
  input = req.body;
});

app.get('/input', (req, res) => {
  res.send(input);
  console.log(input);
});

app.get('/jobs', (req, res) => {
  res.status(200).sendFile(__dirname + '/client/public/job.html');
});

app.get('/api/search', (req, res) => {
  res.end();
});

app.get('/api/result/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT)

console.log("API server started on:" + PORT);
