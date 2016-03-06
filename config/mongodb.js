var session = require('express-session');
var mongoose = require('mongoose');
//var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost/nodejs';
var online = "mongodb://8e08b242daac4ed2a3fd2630a571d032:f3490fd23ec143cba09b2c9cb076c2ff@mongo.duapp.com:8908/mfVlqpifCsIsfHKaksFP"
module.exports = function(){

    mongoose.connect(dbUrl);
}