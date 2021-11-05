var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var discord = require('discord.js');
var colors = require('../../colors.json');

var setupInterraction = async (msg, bot,args) => {
    // var guild = await gdb.get(msg.guild.id);
    // console.log(args);
    // var row = new discord.MessageActionRow().addComponents(new discord.MessageButton().setCustomId(args[0]).setLabel(args[1]).setStyle('DANGER'));

    // msg.channel.send({content: `created integration with custom id: ${args[0]}`, components:[row]})

    // console.log(typeof guild.abc == 'undefined')

}

module.exports.commands = [
    {name: "setupInterraction", locales:[["interaction", 'i', ],["interaction", 'i', ]], out:setupInterraction, defaultPermissions:["ADMINISTRATOR"]},

]