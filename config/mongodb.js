var session = require('express-session');
var mongoose = require('mongoose');
//var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost/nodejs';
module.exports = function(){

    mongoose.connect(dbUrl);
}