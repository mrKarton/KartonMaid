const {Client, Intents} = require("discord.js");
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
    })
})