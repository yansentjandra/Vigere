var mysqlModel = require('mysql-model');

var MyAppModel = mysqlModel.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Vigere',
  port     : '8889'
});

var Job = MyAppModel.extend({
    tableName: "jobs",
});

var Weather = MyAppModel.extend({
    tableName: "weathers",
});

var HousePricing = MyAppModel.extend({
    tableName: "housing",
});

var Disaster = MyAppModel.extend({
    tableName: "disasters",
});

job = new MyAppModel({tableName: "jobs"});

job.find('all', {where: "location == Philadelphia"}, function(err, rows, fields) {
    console.log(rows);
});

module.exports = MyAppModel;
