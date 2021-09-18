const { resolve } = require('path/posix');
var gdb = require('../DB_Functions/Guilds');
var funcs = require('../Helps');
module.exports.parseMessage = async (message, bot) => {
    prefix = (await gdb.get(message.guild.id)).Prefix;

    return splitForBot(message.content, prefix);

    function splitForBot(content, prefix)
    {
        if(typeof(content) == typeof("String")) //Checking for type of content (we need a string)
        {
            var step1 = content.toLowerCase().split(prefix);//spliting prefix
            var step11 = new Array();
            step1.forEach((elem)=>{
                if(step1.indexOf(elem) != 1 && step1.indexOf(elem) != 0)
                {
                    step11.push(prefix+elem);
                }
                else
                {
                    step11.push(elem);
                }
            });
            var step12 = funcs.ArrayToString(step11);
            if(step1[1] != null)                     //if there are comands
            {
                var step2 = step12.split(" ");     //spliting arguments
                var step3 = step2.filter(element => element != '');//remove empty entries

                return step3; //return

            }
            else
            {
                return 0; //return 0 if error
            }
        }
        else
        {
            return 0;    //return 0 if error
        }
    }
}

module.exports.getAllMemberPermissions = async (member) => {
    var guildRoles = member.guild.roles;
    console.log(member.permissions.bitfield.FLAGS)
}

module.exports.getBotStats = (bot) => {
    return new Promise(async resolve => {
        var guildCount = 0;
        var usersCount = 0;
        var channelCount = 0;

        var guilds = await bot.guilds.fetch()
        guilds.forEach(guild => {
            guildCount++;

            bot.guilds.fetch(guild.id).then(g => {usersCount += g.memberCount;
            g.channels.fetch().then(channels => {
                channels.forEach(channel => {channelCount++;})
            })
            })
        })


        resolve ({guilds: guildCount, users:usersCount, channels:channelCount});
    })
}

module.exports.getStrValuesAfter = (it, arrr) => {
    var rtn = " ";
    for( var i = it; i < arrr.length; i++)
    {
        rtn += (arrr[i]) + " ";
    }
    return rtn;
}

module.exports.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}