var settings = require('./settings').player,
    map = require('./map');

var currentPlace, gameData, playerMarker;

function restart() {
    return {
        money: settings.startingMoney,
        place: settings.startingPoint,
        fuel: {
            value: settings.startingFuel,
            max: settings.startingMaxFuel
        },
        stock: {
            stock: [],
            max: settings.maxStock 
        }
    };
}

function createPlayer(gData) {
    gameData = gData;
    currentPlace = gData.places.findLocation(settings.startingPoint);
    playerMarker = map.createPlayer(currentPlace.getLatLong());
}

function moveToPlace(placeName) {
    if (currentPlace.getConnected().indexOf(placeName) > - 1) {
        // var line = currentPlace.getTitle()
        currentPlace = gameData.places.findLocation(placeName);
        playerMarker.setLatLng(currentPlace.getLatLong());
    }
}

function update() {
    // marker.setLatLng(L.latLng(Math.cos(t * 0.5) * 50, Math.sin(t) * 50));
    //TODO
}

module.exports = {
    start: function(gData) {
        this.data = restart();
        createPlayer(gData);
    },
    getData: function() {
        return this.data;
    },
    update: update,
    moveToPlace: moveToPlace
};
