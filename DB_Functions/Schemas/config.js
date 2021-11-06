var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    Key:String, Value:mongoose.Schema.Types.Mixed, Type:String
})