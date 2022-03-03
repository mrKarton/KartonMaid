const {Client, Intents} = require("discord.js");
const {AutoPoster} = require('topgg-autoposter');

const { modules, moduleCommands, aboutCommand } = require('./Bot/moduler');
const request = require('request');

var   dbTokens                      = require('./DB_Functions/Config');
var   indexFile                     = require('./Bot/index');

var bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS
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

        dbTokens.get('AppId').then(appid => {

            request.get(`https://discord.com/api/v8/applications/${appid}/guilds/688755946624647238/commands`, {
                headers : {
                    authorization : `Bot ${token}`
                }
            }, (err, res, body) => {
                let slashCommands = JSON.parse(body);
                // console.log(slashCommands);
                // if(slashCommands.length == 0) return;
                let slashCommandNames = slashCommands.map(c => c.name);
                // console.log(slashCommands);
                modules().then(modulesList => {
                    modulesList.forEach(module => {
                        
                        moduleCommands(module).then(commands => {
                            
                            if(slashCommands.length == 0)
                            {
                                commands.forEach(async command => {
                                    regCommand({
                                        name : command.locales[1][0],
                                        type : 1,
                                        description : await aboutCommand(command.name, 'en'),
                                        options : command.options
                                    }, appid, token)
                                })
                            }
                            else
                            {  
                                commands.forEach(async command => {
                                    
                                    if(slashCommandNames.indexOf(command.name) == -1)
                                    {
                                        // console.log(module, command, slashCommandNames.indexOf(command.name));

                                        // console.log("!",{
                                        //     name : command.locales[1][0],
                                        //     type : 1,
                                        //     description : await aboutCommand(command.locales[1][0], 'en'),
                                        //     options : command.options
                                        // })

                                        regCommand({
                                            name : command.locales[1][0],
                                            type : 1,
                                            description : await aboutCommand(command.locales[1][0], 'en'),
                                            options : command.options
                                        }, appid, token)
                                    }
                                    
                                })
                            }
                        })
                    })
                })
            })
        })

        
    })
})

let regCommand = (data, appid, token) => {
    // console.log(data);
    request.post(`https://discord.com/api/v8/applications/${appid}/guilds/688755946624647238/commands`, {

        headers : {
            authorization : `Bot ${token}`
        },

        json : data

    }, (err, res, body) => {
        
        // console.log(data.name, JSON.stringify(body), '\n\n');

    })
}