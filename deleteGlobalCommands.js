let request = require('request');
let conf = require('./DB_Functions/Config');

(async () => {
    let token = await conf.GetDBToken();
    let id = await conf.get('AppId');
    request.get(encodeURI(`https://discord.com/api/v8/applications/${id}/guilds/688755946624647238/commands`), {
        headers : {
            authorization : `Bot ${token}`
        }
    }, (err, res, body) => {
        let commands = JSON.parse(body);
        console.log(`${commands.length} need be deleted`)
        commands.forEach(command => {
            request.delete(encodeURI(`https://discord.com/api/v8/applications/${id}/guilds/688755946624647238/commands/${command.id}`), {
                headers : {
                    authorization : `Bot ${token}`
                }
            }, (err, res, body) => {
                console.log(body);
            })
        });
        
    })
})()