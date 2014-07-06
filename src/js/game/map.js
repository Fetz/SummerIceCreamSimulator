var settings = require('./settings').map,
    gameData = require('./data/gameData'),
    map;

function createMap(onReady) {
    map = L.mapbox.map('map', settings.id, settings.options);
    map.on('ready', function() {
        map.featureLayer.on('ready', function() {
            onReady(map, map.featureLayer.getLayers());
        });
    });
}

function prettyPopup() {
    map.featureLayer.eachLayer(function(layer) {
        var place = gameData.getPlaces().findLocation(layer.options.title);

        if (!place)
            return;

        var content = '<div class="prettyPopup ' + place.type() + '">\
            <h2>' + layer.options.title + '<\/h2>\
            <button class="travelButton" data-place="' + layer.options.title  + '"></button>';

        layer.bindPopup(content);
    });
}

function prettify() {
    prettyPopup();
    prettyIcons();
}

function prettyIcons() {

    var typesIcons = {
        'City': '50x50_icon_city.png',
        'Town': '50x50_icon_town.png',
        'Monument': '50x50_icon_monument.png',
        'Sea-side': '50x50_icon_sea_side.png'
    };

    map.featureLayer.eachLayer(function(layer) {
        var place = gameData.getPlaces().findLocation(layer.options.title);
        if (!place)
            return;

        var icon = {
            'iconUrl': 'data/img/' + typesIcons[place.type()],
            'marker-symbol': 'star',
            'iconSize': [40, 34],
            'iconAnchor': [20, 34],
            'popupAnchor': [0, -25],
            'className': 'dot'
        };
        layer.setIcon(L.icon(icon));
    });

}

function createPlayer (coord) {
    var player = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': coord
        },
        'properties': {
            'title': 'Ice cream truck',
            'icon': {
                'iconUrl': 'data/img/truck.png',
                'marker-symbol': 'star',
                'iconSize': [96, 48],
                'iconAnchor': [48, 24],
                'popupAnchor': [0, -25],
                'className': 'dot'
            }
        }
    };
    var geoJSON = map.featureLayer.getGeoJSON();
    geoJSON.features.push(player);
    map.featureLayer.setGeoJSON(geoJSON);

    var marker = L.marker(coord);
    marker.setIcon(L.icon(player.properties.icon));
    marker.addTo(map);
    return marker;
}

module.exports = {
    createMap: createMap,
    createPlayer: createPlayer,
    getMap: function() {
        return map;
    },
    prettify: prettify
};
