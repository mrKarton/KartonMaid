var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Maid');

var config = mongoose.model('configs', require('./Schemas/config'));


module.exports.GetDBToken = async () => {
    return new Promise(resolve => {
        config.find({Key:"Run As"}, async (err, runAs)=>{
            config.find({Key:"Token"}, async (err, tokens)=>{
                tokens.forEach(token => {
                    if(token.Type == runAs[0].Value)
                    {
                        resolve(token.Value);
                        console.log(`Selected ${runAs[0].Value} (${token.Value})`);
                    }
                });
            });
        });  
    });
}

module.exports.DefaultPrefix = async () => {
    return new Promise(resolve => {
        config.find({Key:"Default Prefix"}, async(err, prefix) => {
            resolve(prefix[0].Value);
        })
    })
}

module.exports.get = async (key) => {
    return new Promise(resolve => {
        config.find({Key:key}, async(err, value) => {
            resolve(value[0].Value);
        })
    })
}