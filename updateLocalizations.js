var fs = require('fs');
var help = require('./Helps');

(async ()=>{

    console.log('updating localization modules');

    var paths = await fs.readdirSync('./Localization', { withFileTypes: true }).filter(d => d.isDirectory() && d.name != 'example').map(d => d.name);

    var example = await fs.readdirSync('./Localization/example')
    example.forEach(async module => {
        paths.forEach(async localization => {
            var localeModule = `./Localization/${localization}/${module}`;

            if(! (await fs.existsSync(localeModule)))
            {
                console.log(`${localeModule} must be created`)
                fs.writeFileSync(localeModule, await fs.readFileSync(`./Localization/example/${module}`))
            }
            else
            {
                var originalModule = require(`./Localization/example/${module}`);
                var targetModule = require(localeModule)
                for(var part in originalModule)
                {
                    if(typeof targetModule[part] == 'undefined')
                    {   
                        console.log(`[${localization}] ${module}.${part} must be created`)
                        targetModule[part] = originalModule[part];
                        fs.writeFileSync(localeModule, JSON.stringify(targetModule, null, "\t"));
                    }
                }
            }
        })
    })

    console.log('all localization moudles updated')
})()