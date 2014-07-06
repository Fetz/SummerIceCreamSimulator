var settings = require('../settings').model,
    Places = require('./places'),
    Events = require('./events'),
    Products = require('./products'),
    Audience = require('./audience'),
    Weather = require('./weather'),
    Upgrades = require('./upgrades');

var rawData, data, markers, map, cb;

function loadData() {
    Tabletop.init( { key: settings.url,
        callback: function(data, tabletop) {
            rawData = data;
            buildData();
        }, simpleSheet: false }
    ); 
}


function buildData() {
    Places.create(rawData[settings.places], map, markers.slice(0));
    Events.create(rawData[settings.events]);
    Products.create(rawData[settings.products]);
    Audience.create(rawData[settings.audience]);
    Upgrades.create(rawData[settings.upgrades]);
    Weather.create(rawData[settings.weather]);
    data = {
        places: Places,
        events: Events,
        products: Products,
        audience: Audience,
        upgrades: Upgrades,
        weather: Weather
    };
    cb(data);
}

module.exports = {
    start: function(mapParam, mapMarker, callback) {
        cb = callback;
        map = mapParam;
        markers = mapMarker;
        if (!data)
            loadData();
        else
           cb(data);
    },
    getPlaces: function() {
        return data.places;
    }
};
