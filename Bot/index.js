const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const {MessageEmbed} = require('discord.js');
var guilds = require('../DB_Functions/Guilds');
var bg = require('./bgFunctions');
var moduler = require('./moduler');


module.exports = async (bot) => {
    guilds.CheckAndFill(bot);
    require('./Listeners/messageCreate')(bot);
    require('./Listeners/integrations')(bot);

    setInterval(async ()=>{
        (await guilds.getAll()).forEach(guild => {
            require('./Ticks/interactionCleaner')(guild); // require all Tick functions manually
        })
    }, 1000);
}