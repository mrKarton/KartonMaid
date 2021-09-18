/* 
    # - in dev (hidden)
    $ - Developer only (hidden)
    ! - beta
*/

var fs = require('fs');
var localization = require('../Localization/index');

module.exports.getCommand = async (name) => {
    return new Promise(resolve => {
        fs.readdir('./Bot/modules', (err, files)=>{
            if (err) throw err;

            files.forEach(file => {
                var module = require(`./modules/${file}`);
                module.commands.forEach(command => {
                    // console.log(command);
                    command.locales.forEach(locale => {
                        locale.forEach(comm => {
                            // console.log(comm, name, comm == name);
                            if(comm == name)
                            {
                                resolve(command);
                            }
                        })
                    })
                })
            })
            resolve(0);
        })
    })
}

module.exports.aboutCommand = async (name, lang) => {
    return new Promise(resolve => {
        fs.readdir('./Bot/modules', (err, files)=>{
            if (err) throw err;

            files.forEach(file => {
                var module = require(`./modules/${file}`);
                module.commands.forEach(command => {
                    // console.log(command);
                    command.locales.forEach(locale => {
                        locale.forEach(async comm => {
                            // console.log(comm, name, comm == name);
                            if(comm == name)
                            {
                                var language = await localization.getModule(lang, file.split('.')[0]);

                                if(typeof language[command.name].about == 'undefined')
                                {
                                    resolve("The description of this command does not exist or has not been translated into your language");
                                }
                                else
                                {
                                    console.log(language[command.name].about)
                                    resolve(language[command.name].about);

                                }
                            }
                        })
                    })
                })
            })
        })
    })
}

module.exports.moduleCommands = async (module) => {
    return require(`./modules/${module}`).commands;
}

module.exports.modules = async () => {
    return new Promise(async resolve => {
        var files = await fs.readdirSync('./Bot/modules');
        var moduleList = new Array();
        files.forEach(file => {
            if(!file.startsWith('$'))
            {
                moduleList.push(file.split('.')[0]);
            }
        })
        resolve(moduleList);

    })
}