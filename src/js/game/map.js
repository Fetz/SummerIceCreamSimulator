var settings = require('./settings').map,
    map;

// function testLimits(map) {
//     [
//         [[49, -8], [59, 2.3]],
//     ].forEach(function(coordinates) {
//         console.log(L.polyline(coordinates, {color: '#000'}).addTo(map));
//     });
// }

function createMap(onReady) {
    map = L.mapbox.map('map', settings.id, settings.options);
    map.on('ready', function() {
        map.featureLayer.on('ready', function() {
            onReady(map, map.featureLayer.getLayers());
        });
        // testLimits(map);
    });
}


module.exports = {
    createMap: createMap
};
