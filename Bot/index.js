const {MessageEmbed} = require('discord.js');
var guilds = require('../DB_Functions/Guilds');
var bg = require('./bgFunctions');
var moduler = require('./moduler');
var messageCreate = require('./Listeners/messageCreate');

module.exports = async (bot) => {
    guilds.CheckAndFill(bot);
    messageCreate(bot);
}