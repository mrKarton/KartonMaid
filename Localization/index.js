var fs = require('fs');
const { resolve } = require('path/posix');

module.exports.getExtension = (lang, moduleName, ext) => {
    
}

module.exports.getModule = (lang, moduleName) =>
{
    // console.log(`"${moduleName}" from ${lang}`)
    if(fs.existsSync(`./Localization/${lang}/${moduleName}.json`))
    {
        return require(`./${lang}/${moduleName}.json`);
    }
    else
    {
        return 0;
    }
}

module.exports.getLangsList = async () => {

    return new Promise(async resolve => {
        var paths = await fs.readdirSync('./Localization', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
        resolve(paths);

    })
    
}