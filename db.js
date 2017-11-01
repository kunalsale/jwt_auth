var mongoose = require('mongoose');
var config   = require('./config.js');
console.log(config.db);

mongoose.connect(config.db);
console.log('COnnected');
