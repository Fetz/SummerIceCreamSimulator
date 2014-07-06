var settings = require('../settings').model,
    Places = require('./places'),
    Events = require('./events'),
    Products = require('./products'),
    Audience = require('./audience'),
    Weather = require('./weather'),
    Upgrades = require('./upgrades');

var rawData, data;

function loadData(callback) {
    Tabletop.init( { key: settings.url,
        callback: function(data, tabletop) {
            rawData = data;
            buildData(callback);
        }, simpleSheet: false }
    ); 
}


function buildData(callback) {
    data = {
        places: Places.create(rawData[settings.places]),
        events: Events.create(rawData[settings.events]),
        products: Products.create(rawData[settings.products]),
        audience: Audience.create(rawData[settings.audience]),
        upgrades: Upgrades.create(rawData[settings.upgrades]),
        weather: Weather.create(rawData[settings.weather])
    };
    callback(data);
}

module.exports = {
    getData: function(callback) {
        if (!data)
            loadData(callback);
        else
           callback(data);
    }
};
