var discord = require('discord.js');
var funcs = require('../bgFunctions');
var colors = require('../../colors.json');
var gdb = require('../../DB_Functions/Guilds');
var langCore = require('../../Localization/index')
const request = require('request');

function hit(msg, bot, args)
{
    return RP(bot,msg,args,"hit");
}

function kiss(msg, bot, args)
{
    return RP(bot,msg,args,"kiss");
}

function kill(msg, bot,args)
{
    return RP(bot,msg,args,"kill");
}

function hug(msg, bot,args)
{
    return RP(bot,msg,args,"hug");
}

function ban(msg, bot, args)
{
    return RP(bot,msg,args,"ban");
}

function fuck(msg, bot, args)
{
    return RP(bot,msg,args,"fuck");
}

function gift(msg, bot, args)
{
    return RP(bot,msg,args,"gift");
}

function pat(msg, bot, args)
{
    return RP(bot,msg,args,"pat");
}

async function RP(bot, msg, args, type)
{

    var guild = await gdb.get(msg.guild.id);
    var lang = langCore.getModule(guild.Language, 'roleplay'); 
    var dat = lang[type];
    var color = colors.roleplay[type];

    return new Promise(resolve => {
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
                `<@!${args[0]}>`).setImage(gifURL);
                // console.log("ARGS!!!!!!!",args);
                if(args.length == 2)
                { 
                    var wWords = lang.withWords;
                    embed.addField(wWords, args[1]);
                }
//
                resolve({embeds:[embed]});
                // msg.delete();
            }
        });
    })

    
}

module.exports.commands = [
    {name:'hit', locales: [["ударить", "уебать", "пнуть", "ударил"], ["punch", "beat"]], out:hit, defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to beat"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"kiss",locales: [["цем", "поцеловать","поцеловал"],["kiss"]], out:kiss, defaultPermissions:[], defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to kiss"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"kill",locales: [["убить", "убил"], ["kill", "murder"]], out:kill, defaultPermissions:[], defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to kill"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"hug",locales: [["обнять", "обнял"], ["hug"]], out:hug, defaultPermissions:[], defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to hug"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"ban",locales: [["забанить", "бан"], ["ban"]], out:ban, defaultPermissions:[], defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to ban (as a joke)"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"fuck",locales: [["выебать", "засексить"], ["fuck"]], out:fuck, defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to fuck"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"gift",locales: [["подарок", "подарить"], ["gift", "give"]], out:gift, defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to give a gift to"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]},
    {name:"pat" ,locales: [["погладить"], ["pat"]], out:pat, defaultPermissions:[],options:[{type:6, name:"target", required:true, description: "who you want to pat"}, {type:3, name:"text", required:false, description: "what you talking while doing this?"}]}
];

// module.exports.module = {name:[["ролеплей", "рп", "странные-гифки"], ["roleplay", "rp"]], about:["РП команды на \\Почти все\\ случаи жизни: от поцелуев до секоса, от ударов до убийства \n (Гифки взяты с **[Тенора](https://tenor.com)**)", 
// "Bring a colors into your chatting! Roleplay commands, thanks to which you can easily portray your action ;)\n(Gifs are from **[Tenor](https://tenor.com)**)"]}