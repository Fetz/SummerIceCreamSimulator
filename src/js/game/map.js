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
    // map.featureLayer.setGeoJSON({
    //     'type': 'Feature',
    //     'geometry': {
    //         'type': 'Point',
    //         'coordinates': coord
    //     },
    //     'properties': {
    //         'title': 'Ice cream truck',
    //         'icon': {
    //             'iconUrl': '/data/img/truck.png',
    //             'iconSize': [50, 50], // size of the icon
    //             'iconAnchor': [25, 25], // point of the icon which will correspond to marker's location
    //             'popupAnchor': [0, -25], // point from which the popup should open relative to the iconAnchor
    //             'className': 'dot'
    //         }
    //     }
    // });
    // var marker = L.marker(coord, {
    //   icon: L.mapbox.marker.icon({
    //     'iconUrl': '/data/img/truck.png',
    //     'iconSize': [128, 64],
    //     'iconAnchor': [64, 32]
    //   })
    // }).addTo(map);
}

module.exports = {
    createMap: createMap,
    createPlayer: createPlayer
};
