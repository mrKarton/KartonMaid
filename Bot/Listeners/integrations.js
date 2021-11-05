var gbd = require('../../DB_Functions/Guilds');
var config = require('../../DB_Functions/Config');
var bg = require('../bgFunctions');
var moduler = require('../moduler');
var ds = require('discord.js');
const { cpSync } = require('fs');
var colors = require('../../colors.json');
var idb = require('../../DB_Functions/Interactions');

module.exports = async (bot) => {
    bot.on('interactionCreate', async interaction => {
        
        
        var data = await idb.get(interaction.customId);
        if(data != -1)
        {
            require(`../Interactions/${data.Type}`)(interaction, data, bot);
            interaction.deferUpdate();
        }
        else
        {
            interaction.reply({embeds:[new ds.MessageEmbed().setColor(colors.error).setDescription('❌ Error: Timed Out')]})
        }
    })
} 