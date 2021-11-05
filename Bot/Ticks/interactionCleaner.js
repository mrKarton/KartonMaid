var idb = require('../../DB_Functions/Interactions');
var mongoose = require('mongoose');

module.exports = async () => {
    (await idb.getAll()).forEach(elem => {
        var date = new Date(elem.Date);

        var nextDay = new Date(date.getTime() + (1000*60*60*24));

        if(Date.now() > nextDay)
        {
            idb.deletebyId(elem._id)
        }
    })
}