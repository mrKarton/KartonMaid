const {Client, Intents} = require("discord.js");
const {AutoPoster} = require('topgg-autoposter');

var   dbTokens                      = require('./DB_Functions/Config');
var   indexFile                     = require('./Bot/index');

var bot = new Client({
    intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
    ]
});

dbTokens.GetDBToken().then(token => {
    bot.login(token);
    bot.on('ready', ()=>{
        console.log(`Hello, I'm ${bot.user.username}`);
        indexFile(bot);

        dbTokens.get('Topgg Token').then(topgg => {
            const ap = AutoPoster(topgg, bot);

            ap.on('posted', data => {
                console.log(`[Auto Poster] data posted ${JSON.stringify(data)}`);
            })
        })
    })
})