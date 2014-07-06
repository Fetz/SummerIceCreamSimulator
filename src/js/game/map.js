var settings = require('./settings').map,
    map;

function createMap(onReady) {
    map = L.mapbox.map('map', settings.id, settings.options);
    map.on('ready', function() {
        map.featureLayer.on('ready', function() {
            onReady(map, map.featureLayer.getLayers());
        });
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
    }
};
