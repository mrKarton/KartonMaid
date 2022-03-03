var bg = require('../bgFunctions');
var version = require('../../version.json')
var langCore = require('../../Localization/index');
var config = require('../../DB_Functions/Config');

// const { AnonymousGuild } = require('discord.js');

module.exports = async (bot) => {
    var statusVariants = [
        // `Hentai used ${await config.get('Hentai used')} times`,
        // `v.${version.version}!`,
        // `v.${version.version} - ${version.title}`,
        // `Started as ${version['Run As']}`,
        // 'See another projects: mrkarton.ru!',
        // 'Vote us Top.gg',
        // 'Your personal maid!',
        // `My languages: ${ bg.dotLsit(await langCore.getLangsList(), "")}`
        // 'Setting up all systems. Get Ready soon',
        'Starting up. Checkout mrkarton.ru/Maid'
    ]

    var statusTypes = [
        "PLAYING",
        "LISTENING",
        "WATCHING",
    ]

    var status = statusVariants[bg.getRandomInt(0, statusVariants.length -1)];
    var type = statusTypes[bg.getRandomInt(0, statusTypes.length-1)];

    bot.user.setActivity(status, {type:type});
}