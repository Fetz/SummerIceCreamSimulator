var settings = require('./settings').map;

function testLimits(map) {
    [
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ],
        [ [49, -8], [59, 2.3] ]
    ].forEach(function(coordinates) {
        L.geoJson({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            },
            properties: {
                'stroke': '#ff8888',
                'stroke-opacity': 1,
                'stroke-width': 4
            }
        }, { style: L.mapbox.simplestyle.style }).addTo(map);
    });
    
}

function createMap(onReady) {
    var layer = L.mapbox.map('map', 'brotherolder.iml96813', settings);
    layer.on('ready', function() {
        onReady('mapbox ready');
        testLimits(layer);
        // call .getTileJSON and investigate its properties
    });
}


module.exports = {
    createMap: createMap
};
