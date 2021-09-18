var mongoose = require('mongoose');

module.exports = new mongoose.Schema({ 
    server: String, command:String, roles:Array
});