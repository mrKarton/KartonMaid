var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var discord = require('discord.js');
var colors = require('../../colors.json');

var setPrefix = async (msg, bot, args) => {
    console.log(args);
    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'admin');

    if (args.length > 1)
    {
        msg.channel.send({embeds:[new discord.MessageEmbed()
        .setColor(colors.error).setDescription(lang.setPrefix.syntaxError)]});
    }
    else
    {
        gdb.set(msg.guild.id, {Prefix:args[0]});

        msg.channel.send({embeds:[new discord.MessageEmbed()
            .setColor(colors.success).setDescription(lang.setPrefix.success)]});
    }
    
}

var getLangs = async (msg, bot, args) => {

    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'admin');

    var langs = await langCore.getLangsList();
    var list = "**";
    langs.forEach(element => {
        list += `•  ${element} \n`
    });
    list += "**"

    msg.channel.send({embeds:[new discord.MessageEmbed().setTitle(lang.langList.title).setDescription(list).setColor(colors.info)]});
}

var setLang = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'admin');

    var langs = await langCore.getLangsList();
    if(langs.includes(args[0]))
    {
        gdb.set(msg.guild.id, {Language:args[0]});
        msg.channel.send({embeds:[new discord.MessageEmbed().setDescription(lang.setLang.success).setColor(colors.success)]});
    }
    else
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setDescription(lang.setLang.error).setColor(colors.error)]});
    }
}

module.exports.commands = [
    {name: "setPrefix", locales:[["префикс"],["prefix"]], out:setPrefix, defaultPermissions:["ADMINISTRATOR"]},
    {name: "langList", locales:[["языки"], ["languages", "langs"]], out:getLangs, defaultPermissions:[]},
    {name: "setLang", locales:[["язык"], ["language", "lang"]], out:setLang, defaultPermissions:["ADMINISTRATOR"]}
]