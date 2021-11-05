
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Maid');

var interactions = mongoose.model('interactions', require('./Schemas/interaction'));
var {Generator} = require('snowflake-generator');
const interaction = require('./Schemas/interaction');

module.exports.insert = async (data) => {
    data['Date'] = Date.now();
    var ini = await interactions.insertMany(data)

    return ini[0]._id;
}

module.exports.get = async (id) => {
    return new Promise(async resolve => {
        var interaction = (await interactions.find({_id:mongoose.mongo.ObjectId(id)}))[0];

        if(typeof interaction == 'undefined')
        {
            resolve(-1);
        }
        else 
        {
            resolve(interaction._doc);
        }
    })
}

module.exports.deletebyId = async (id) => {
    var interaction = (await interactions.find({_id:mongoose.mongo.ObjectId(id)}))[0];
    interaction.remove();
}

module.exports.getAll = async () => {
    return await interactions.find();
}

module.exports.deleteAll = async (data) => {
    var interraction = (await interactions.find({_id:mongoose.mongo.ObjectId(data)}));

    console.log(interaction);
    // interraction.forEach(elem => {
    //     elem.remove();
    // })
}