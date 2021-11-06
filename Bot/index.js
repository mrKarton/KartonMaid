const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const {MessageEmbed} = require('discord.js');
var guilds = require('../DB_Functions/Guilds');
var bg = require('./bgFunctions');
var moduler = require('./moduler');


module.exports = async (bot) => {
    guilds.CheckAndFill(bot);
    require('./Listeners/messageCreate')(bot);
    require('./Listeners/integrations')(bot);
    require('./Listeners/newGuild')(bot);

    setInterval(async ()=>{
        (await guilds.getAll()).forEach(guild => {
             // require all Tick functions manually

        })
        require('./Ticks/interactionCleaner')(bot);     //non-guild functions
        require('./Ticks/statusChanger')(bot);
    }, 1000 * 60 * 5);
}