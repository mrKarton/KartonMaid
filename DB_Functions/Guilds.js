var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Maid');

var config = require('./Config');
var help   = require('../Helps');
var guilds = mongoose.model('guilds', require('./Schemas/guild'))
var permissionsDb = mongoose.model('additional permissions', require('./Schemas/additionalPermissions'));

module.exports.CheckAndFill = async (bot) => {
    bot.guilds.cache.forEach(async guild => {
        var dbGuild = (await guilds.find({ID:guild.id}))[0];
        if(typeof dbGuild == 'undefined')
        {
            guilds.insertMany({ID:guild.id, Name:guild.name, Prefix:(await config.DefaultPrefix()), Language:(await config.get("Default lang"))});
        }
    })
}

module.exports.get = async (id) => {
    return new Promise(async resolve => {
        var guild = (await guilds.find({ID:id}))[0];

        if(typeof guild == 'undefined')
        {
            resolve(-1);
        }
        else 
        {
            resolve(guild._doc);
        }
    })
}

module.exports.set = async (id, newGuild) => {
    var guild = (await guilds.findOne({ID:id}));
    if(guild == -1) return;

    var newObj = help.Objects(guild._doc, newGuild);
    // console.log(newObj)
    guild.overwrite(newObj);
    guild.save();
    
}

module.exports.getPermissionsForCommand = async (name, server) => {
    var permissions = (await permissionsDb.findOne({server:server, command:name}));
    if(permissions == null)
    {
        return 0;
    }
    return permissions.roles;
} 

module.exports.getAll = async () => {
    return await guilds.find();
    
}