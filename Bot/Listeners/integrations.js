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
        // console.log(interaction);
        // console.log(interaction);
        switch(interaction.type)
        {
            case "MESSAGE_COMPONENT":
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
            break;

            case "APPLICATION_COMMAND":
                moduler.getCommand(interaction.commandName).then(async command => {
                    let channel = await bot.channels.fetch(`${interaction.channelId}`);
                    let options = interaction.options._hoistedOptions.map(o => o.value);

                    let message = {
                        author : interaction.user,
                        guild : interaction.member.guild,
                        channel : channel,
                        content: `n ${options.join(' ')}`
                    }
                    // console.log(message);
                    // console.log(await command.out(message, bot, []));

                    interaction.reply(await command.out(message, bot, options));
                    
                })
            break;
        }
        
    })
} 