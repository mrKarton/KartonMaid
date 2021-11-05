var gbd = require('../../DB_Functions/Guilds');
var config = require('../../DB_Functions/Config');
var bg = require('../bgFunctions');
var moduler = require('../moduler');
var ds = require('discord.js');
const { cpSync } = require('fs');
var colors = require('../../colors.json');

module.exports = async (bot) => {
    bot.on('messageCreate', message => {
        if(message.author.id != bot.user.id)
        {
             gbd.get(message.guild.id).then(async guild => {
                 if(message.content.startsWith(guild.Prefix))
                 {
                    var args = await bg.parseMessage(message, guild.Prefix);

                    moduler.getCommand(args[0]).then(async command => {
                        if(args[1] != '?')
                        {
                            if(args[1] == '\\\\?')
                            {
                                args[1] = '?'
                            }
                            if (command == 0)
                            {
                                message.react('⚠');
                                return;
                            }
                            var canUse = true;
                            var member = await message.guild.members.fetch(message.author.id);
                            command.defaultPermissions.forEach(permission => {

                                if(!member.permissions.has(permission))
                                {
                                    canUse = false;
                                }
                            })
                            var additionalPermissions = await gbd.getPermissionsForCommand(command.name, guild.id);
                            if(additionalPermissions != 0)
                            {
                                additionalPermissions.forEach(permission => {
                                    //ДЛЯ ДОПОЛНИТЕЛЬНЫХ РОЛЕЙ КОД ЗДЕСЬ
                                })
                            }

                            if(canUse)
                            {
                                command.out(message, bot, args.slice(1, args.length));
                            }
                            else{
                                message.react('❌')
                            }

                        }
                        else
                        {
                            moduler.aboutCommand(args[0], guild.Language).then(about => {
                                
                                message.channel.send({embeds:[new ds.MessageEmbed().setDescription(about).setTitle(args[0]).setColor(colors.info)]})
                            })
                        }
                    })
                 }
             })
        }
    })
}