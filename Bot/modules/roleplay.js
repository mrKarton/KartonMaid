var discord = require('discord.js');
var funcs = require('../bgFunctions');
var colors = require('../../colors.json');
var gdb = require('../../DB_Functions/Guilds');
var langCore = require('../../Localization/index')
const request = require('request');

function hit(msg, bot, args)
{
    RP(bot,msg,args,"hit");
}

function kiss(msg, bot, args)
{
    RP(bot,msg,args,"kiss");
}

function kill(msg, bot,args)
{
    RP(bot,msg,args,"kill");
}

function hug(msg, bot,args)
{
    RP(bot,msg,args,"hug");
}

function ban(msg, bot, args)
{
    RP(bot,msg,args,"ban");
}

function fuck(msg, bot, args)
{
    RP(bot,msg,args,"fuck");
}

function gift(msg, bot, args)
{
    RP(bot,msg,args,"gift");
}

function pat(msg, bot, args)
{
    RP(bot,msg,args,"pat");
}

async function RP(bot, msg, args, type)
{

    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'roleplay'); 
    var dat = lang[type];
    var color = colors.roleplay[type];

    request(`http://mrkarton.ru:7777/tenor?find=${type}`, (req, res, body)=>{
        if(body != '404')
        {
            var gifURL = body;
            
            // console.log(gifURL);

            if(type == 'fuck')
            {
                gifURL = dat.gif[funcs.getRandomInt(0, dat.gif.length)];
            }
            var embed = new discord.MessageEmbed().setColor(color)
            .setTitle(dat.title[funcs.getRandomInt(0, dat.title.length)])
            .setDescription("<@" + msg.author.id + "> " + dat.phrase[funcs.getRandomInt(0, dat.phrase.length)] + " " +
            msg.content.split(" ")[1]).setImage(gifURL);
            // console.log(args);
            if(args.length > 1)
            {
                var wWords = lang.withWords;
                embed.addField(wWords, funcs.getStrValuesAfter(1, args) );
            }

            msg.channel.send({embeds:[embed]});
            msg.delete();
        }
    });

    
}

module.exports.commands = [
    {name:'hit', locales: [["ударить", "уебать", "пнуть", "ударил"], ["punch", "beat"]], out:hit, defaultPermissions:[]},
    {name:"kiss",locales: [["цем", "поцеловать","поцеловал"],["kiss"]], out:kiss, defaultPermissions:[]},
    {name:"kill",locales: [["убить", "убил"], ["kill", "murder"]], out:kill, defaultPermissions:[]},
    {name:"hug",locales: [["обнять", "обнял"], ["hug"]], out:hug, defaultPermissions:[]},
    {name:"ban",locales: [["забанить", "бан"], ["ban"]], out:ban, defaultPermissions:[]},
    {name:"fuck",locales: [["выебать", "засексить"], ["fuck"]], out:fuck, defaultPermissions:[]},
    {name:"gift",locales: [["подарок", "подарить"], ["gift", "give"]], out:gift, defaultPermissions:[]},
    {name:"pat" ,locales: [["погладить"], ["pat"]], out:pat, defaultPermissions:[]}
];

// module.exports.module = {name:[["ролеплей", "рп", "странные-гифки"], ["roleplay", "rp"]], about:["РП команды на \\Почти все\\ случаи жизни: от поцелуев до секоса, от ударов до убийства \n (Гифки взяты с **[Тенора](https://tenor.com)**)", 
// "Bring a colors into your chatting! Roleplay commands, thanks to which you can easily portray your action ;)\n(Gifs are from **[Tenor](https://tenor.com)**)"]}