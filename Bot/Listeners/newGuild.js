var gdb = require('../../DB_Functions/Guilds');

module.exports = async (bot) => {
    bot.on('guildCreate', guild => {
        gdb.CheckAndFill();         //!!Personalize languages, make function to add only one guild by Event data!!
    })
}