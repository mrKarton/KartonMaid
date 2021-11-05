var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    ID:String, Type:String, Target:Object, Action:String, Date: Date
})