var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var discord = require('discord.js');
var colors = require('../../colors.json');
var moduler = require('../moduler');
var bg = require('../bgFunctions');
var {MessageActionRow, MessageButton} = require('discord.js');
var idb = require('../../DB_Functions/Interactions')
// 0 - admin // 1 - public
var setup = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'tickets');

    if(guild.TicketChannels.length == 0)
    {
        if(args.length != 2) 
        {
            msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(`❌ ${lang.setupTickets.syntaxError}`)]});
            return;
        }

        for(var i = 0; i < args.length; i++)
        {
            var id = bg.getID(args[i]);
            if(id == args[i])
            {
                msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(`❌ ${lang.setupTickets.dataError}`)]});
                return;
            }
            args[i] = id;
        }
        msg.react('🔄');
        gdb.set(msg.guild.id, {TicketChannels:args})
        await (await bot.channels.fetch(args[0])).send({embeds:[new discord.MessageEmbed().setColor(colors.success).setTitle(lang.setupTickets.adminChannel.head).setDescription(lang.setupTickets.adminChannel.body)]})
        await (await bot.channels.fetch(args[1])).send({embeds:[new discord.MessageEmbed().setColor(colors.success).setTitle(lang.setupTickets.publicChannel.head).setDescription(lang.setupTickets.publicChannel.body)]})
        msg.reactions.removeAll();
        msg.react('✅');
 
    }
    else 
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(`❌ ${lang.setupTickets.existsError}`)]})
    }
}

var disable = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'tickets');

    if(guild.TicketChannels.length != 0)
    {
        (await bot.channels.fetch(guild.TicketChannels[0])).send({embeds:[new discord.MessageEmbed().setColor(colors.info).setDescription(lang.disableTickets.body).setTitle(lang.disableTickets.head)]});
        (await bot.channels.fetch(guild.TicketChannels[1])).send({embeds:[new discord.MessageEmbed().setColor(colors.info).setDescription(lang.disableTickets.body).setTitle(lang.disableTickets.head)]});

        gdb.set(msg.guild.id, {TicketChannels:[]})

        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.success).setDescription(`✅ ${lang.disableTickets.success}`)]});
    }
    else
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(`❌ ${lang.disableTickets.existsError}`)]});
    }

}

var report = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'tickets');

    if(guild.TicketChannels.length == 0)
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(`❌ ${lang.reportUser.existsError}`)]});
        return;
    }
    // if(typeof guild.ReportCount == 'undefined')
    // {
    //     console.log(typeof guild.ReportCount)
    //     await gdb.set(msg.guild.id, {ReportCount:1});
    // }
    // else
    // {
    //     await gdb.set(msg.guild.id, {ReportCount:guild.ReportCount + 1})
    // }
    
    var publicMessage = await (await bot.channels.fetch(guild.TicketChannels[1])).send({embeds:[new discord.MessageEmbed()
        .setColor(colors.info).setTitle(`${lang.reportUser.head}`).setFooter(msg.author.username, msg.author.avatarURL())
        .setDescription(bg.getStrValuesAfter(0, args))]})
    
    var thread = await publicMessage.startThread({
        name: `Conversation `,
        autoArchiveDuration: 60,
        reason: 'Needed a separate thread for food',
    })
    
    if(msg.attachments.size != 0)
    {
        var attachments = new Array();
        msg.attachments.forEach(elem => {
            attachments.push(elem.attachment);
        })

        thread.send({content: `${lang.decision.attachments}:`,files: attachments})
    }

    var targetData = {
        message : publicMessage.id,
        channel : guild.TicketChannels[1]
    }

    var acceptID = await idb.insert({
        Type   : 'report',
        Target : targetData,
        Action : 'accept'
    })
    var denclineID = await idb.insert({
        Type   : 'report',
        Target : targetData,
        Action : 'dencline'
    })

    var acceptButton = new MessageButton().setCustomId(`${acceptID}`).setStyle('SUCCESS').setEmoji('✔')
    var denclineButton = new MessageButton().setCustomId(`${denclineID}`).setStyle('DANGER').setEmoji('✖️');
    
    var buttonRow = new MessageActionRow().addComponents(acceptButton).addComponents(denclineButton);

    (await bot.channels.fetch(guild.TicketChannels[0])).send({embeds:[new discord.MessageEmbed()
        .setColor(colors.info).setTitle(`${lang.reportUser.head}`).setFooter(msg.author.username, msg.author.avatarURL())
        .setDescription(bg.getStrValuesAfter(0, args))], components:[buttonRow], files:attachments})

    
}

module.exports.commands = [
    {name: "setupTickets", locales:[["жалобы.вкл", "жб.вкл", "ж.в", "жв"],["tisckets | setup", "t.s", "ts"]], out:setup, defaultPermissions:["ADMINISTRATOR"]},
    {name: "disableTickets", locales:[["жалобы.выкл", "жб.выкл", "ж.вы", "жвы"],["tisckets setup | disable", "t.d", "td"]], out:disable, defaultPermissions:["ADMINISTRATOR"]},
    {name: "reportUser", locales:[["репорт", "жб"],["report"]], out:report, defaultPermissions:[]},
]