var langCore = require('../../Localization/index');
var gdb = require('../../DB_Functions/Guilds');
var idb = require('../../DB_Functions/Interactions');
var discord = require('discord.js');
var colors = require('../../colors.json');
const request = require('request');
var {MessageActionRow, MessageButton} = require('discord.js');
var fs = require('fs');
var hentai = async (msg, bot, args) => {
    if(!msg.channel.nsfw)
    {
        msg.react("❌");
        return;
    }

    request('http://mrkarton.ru:7777/hentai', async (req, res, body) => {
        var data = JSON.parse(body);
        var files = new Array();
        for(var i = 0; i < 10; i++)
        {
            files.push(data.result[i]);
        }
        var id = await idb.insert({Type:"more hentai", Target:msg.channel.id});
        console.log(id);
        var row = new MessageActionRow().addComponents(new MessageButton().setCustomId(`${id}`)
            .setStyle('PRIMARY').setLabel('MORE'));

        msg.channel.send({content:data.title, files:files, components:[row]})

        var version = require('../../version.json');
        version.hentaiUsedTimes += 1;

        // console.log(version); 
        fs.writeFileSync('./version.json', JSON.stringify(version, null, '\t'));
    })
}

module.exports.commands = [
    {name: "getHentai", locales:[["хентай", "хент"],["hentai"]], out:hentai, defaultPermissions:["ADMINISTRATOR"]},
]