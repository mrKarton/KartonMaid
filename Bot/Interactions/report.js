var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');

var {MessageActionRow, MessageButton} = require('discord.js');
var idb = require('../../DB_Functions/Interactions');

module.exports = async (interaction, data, bot) => {

    var guild = await gdb.get(interaction.message.guild.id);
    var lang = langCore.getModule(guild.Language, 'tickets');

    var message = await (await bot.channels.fetch(data.Target.channel)).messages.fetch(data.Target.message);
    interaction.message.components[0].components[0].disabled = true;
    interaction.message.components[0].components[1].disabled = true;
    // console.log(interaction.message.components)

    interaction.message.edit({components:interaction.message.components})
    interaction.message.edit(`${lang.decision.by} <@${interaction.user.id}>`)
    var button = new MessageButton().setCustomId('resolve').setDisabled(true);

    if(data.Action == 'accept')
    {
        button.setStyle('SUCCESS').setEmoji('✔')
    }
    else
    {
        button.setStyle('DANGER').setEmoji('✖️');
    }

    var row = new MessageActionRow().addComponents(button);
    // console.log(row)
    message.edit({components:[row]})
    message.thread.send(`${lang.decision.by} <@${interaction.user.id}> - ${data.Action == 'accept' ? '✔' : '✖️'}`)
    // idb.deleteAll({Target:data.Target})
}