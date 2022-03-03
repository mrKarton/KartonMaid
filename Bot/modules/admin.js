var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var discord = require('discord.js');
var colors = require('../../colors.json');
var bg = require('../bgFunctions');

var setPrefix = async (msg, bot, args) => {
    // console.log(args);
    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'admin');

    if (args.length > 1)
    {
        return({embeds:[new discord.MessageEmbed()
        .setColor(colors.error).setDescription(lang.setPrefix.syntaxError)]});
    }
    else
    {
        gdb.set(msg.guild.id, {Prefix:args[0]});

        return({embeds:[new discord.MessageEmbed()
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

    return({embeds:[new discord.MessageEmbed().setTitle(lang.langList.title).setDescription(list).setColor(colors.info)]});
}

var setLang = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'admin');

    var langs = await langCore.getLangsList();
    if(langs.includes(args[0]))
    {
        gdb.set(msg.guild.id, {Language:args[0]});
        return({embeds:[new discord.MessageEmbed().setDescription(lang.setLang.success).setColor(colors.success)]});
    }
    else
    {
        return({embeds:[new discord.MessageEmbed().setDescription(lang.setLang.error).setColor(colors.error)]});
    }
}

var reportBug = async (msg, bot, args) => {
    (await bot.users.fetch('471976309598322700')).send({embeds:[new discord.MessageEmbed().setAuthor(msg.author.username, msg.author.avatarURL())
        .setDescription(bg.getStrValuesAfter(0, args)).setTitle("Новое сообщение о баге").setColor(colors.error)]});

    return('Your report sended.')
}

module.exports.commands = [
    //{name: "setPrefix", locales:[["префикс"],["prefix"]], out:setPrefix, defaultPermissions:["ADMINISTRATOR"]},
    {name: "langList", locales:[["языки"], ["languages", "langs"]], out:getLangs, defaultPermissions:[]},
    {name: "setLang", locales:[["язык"], ["language", "lang"]], options:[{type:3, name:"name", required:true, description: "the name of language you want to set"}], out:setLang, defaultPermissions:["ADMINISTRATOR"]},
    {name: "reportBug", locales:[["баг"], ["bugreport"]], out:reportBug, options:[{type:3, name:"text", required:true, description: "the text of your report"}], defaultPermissions:["ADMINISTRATOR"]}
]