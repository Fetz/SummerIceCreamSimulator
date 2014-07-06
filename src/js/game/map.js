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
            <h2>' + layer.options.title + '<\/h2>';

        layer.bindPopup(content);
    });
}

function prettify() {
    prettyPopup();
}

// function createPrettyIcons() {
//     var defaultIcon = {
//         'type': 'Feature',
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [-75.00, 40]
//         },
//         'properties': {
//             'title': 'Ice cream truck',
//             'icon': {
//                 'iconUrl': 'data/img/truck.png',
//                 'marker-symbol': 'star',
//                 'iconSize': [34, 34],
//                 'iconAnchor': [17, 17],
//                 'popupAnchor': [0, -25],
//                 'className': 'dot'
//             }
//         }
//     };

//     var icons = [
//         '50x50_icon_city.png
// 50x50_icon_monument.png
// 50x50_icon_sea_side.png
// 50x50_icon_town.png',
//         '',
//         '',
//         ''
//     ];

//     var geoJSON = map.featureLayer.getGeoJSON();
//     geoJSON.features.forEach(function() {

//     });
// }

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
    window.map = map;

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
