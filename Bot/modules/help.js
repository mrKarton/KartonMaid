var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var discord = require('discord.js');
var colors = require('../../colors.json');
var moduler = require('../moduler');
var bg = require('../bgFunctions');
var help = async (msg, bot, args) => {
    
    var guild = await gdb.get(msg.guild.id);
    lang = langCore.getModule(guild.Language, 'help');
    var embed = new discord.MessageEmbed()
    .setFooter('mrKarton • 2021 • mrkarton.ru', (await bot.users.fetch('471976309598322700'))
    .avatarURL()).setColor(colors.info).setThumbnail(bot.user.avatarURL())
    .setTitle(lang.help.title).setDescription(lang.help.description);
    
    // var stats = bg.getBotStats(bot);
    // console.log(stats);
    // embed.addField(lang.help.fieldTitles[0], stats.guilds, true)
    // .addField(lang.help.fieldTitles[1], stats.guilds.channels, true)
    // .addField(lang.help.fieldTitles[2], stats.guilds.users, true)

    embed.addFields(lang.help.additionalFields);
    return {embeds:[embed]};
    
}

var moduleAbout = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'help').module;
    if(!args.length == 1)
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(lang.notFoundError)]})
        return;
    }
    var aboutModule = langCore.getModule(guild.Language, args[0])
    if(aboutModule == 0)
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(lang.notFoundError)]})
        return;
    }
    if(typeof aboutModule.about == 'undefined')
    {
        msg.channel.send({embeds:[new discord.MessageEmbed().setColor(colors.error).setDescription(lang.notTranslatedError)]})
        return;
    }

    var embed = new discord.MessageEmbed().setColor(colors.info).setTitle(`${lang.title} ${args[0]}`)
    .setDescription(typeof aboutModule.about.description == 'undefined' ? "The description is not translated or does not exist, or there is an error in the language package" : aboutModule.about.description);

    var commandsArr = await moduler.moduleCommands(args[0]);
    var commandsList = "";
    commandsArr.forEach(command => {
        commandsList += `• \`${command.locales[1][0]}\` - ${typeof aboutModule[command.name].about == 'undefined' ? "Not Translated" : aboutModule[command.name].about} \n`;
    })
    embed.addField(lang.commandListTitle, commandsList);
    return({embeds:[embed]});
}

var commandList = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'help').commands;

    var modules = await moduler.modules();

    var embed = new discord.MessageEmbed().setColor(colors.info).setTitle(lang.title).setDescription(lang.description);

    modules.forEach(async moduleName => {
        var commads = await moduler.moduleCommands(moduleName);
        
        var commandString = "**";
        commads.forEach(command => {
            commandString += `• \`${guild.Prefix}${command.locales[1][0]}\` `
        });
        commandString += "• **";
        embed.addField(moduleName, commandString);
    })

    embed.setFooter('mrKarton • 2021 • mrkarton.ru', (await bot.users.fetch('471976309598322700')).avatarURL());
    return({embeds:[embed]});

}

var getVersion = async (msg, bot, args) => {
    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'help').version;

    var version = require('../../version.json');
    var embed = new discord.MessageEmbed().setColor(colors.info).setTitle(lang.title).setDescription(lang.description)
    embed.setFooter('mrKarton • 2021 • mrkarton.ru', (await bot.users.fetch('471976309598322700')).avatarURL());

    embed.addField(`${version.version} - ${version.title}`, version.changelog);
    embed.addFields(lang.additionalFields);

    return ({embeds:[embed]});
}

module.exports.commands = [
    {name: "help", locales:[["хелп", "помощь"],["help"]], out:help, defaultPermissions:[]},
    {name: "module", locales:[["модуль"],["module"]], out:moduleAbout, defaultPermissions:[]},
    {name: "commands", locales:[["команды"],["commands"]], out:commandList, defaultPermissions:[]},
    {name: "version", locales:[["версия"],["version"]], out:getVersion, defaultPermissions:[]}
]