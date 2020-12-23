
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
}, { timestamps: true }

);

module.exports = mongoose.model('Tasks', TaskSchema);

var MLBSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
}, { timestamps: true }

);

module.exports = mongoose.model('MLB', MLBSchema);





