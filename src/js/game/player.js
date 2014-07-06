var settings = require('./settings').player,
    map = require('./map');

var currentPlace, gameData, playerMarker;

function restart() {
    var products = gameData.products.getByLevel(1);

    return {
        money: settings.startingMoney,
        place: settings.startingPoint,
        fuel: {
            value: settings.startingFuel,
            max: settings.startingMaxFuel
        },
        stock: {
            products: products.slice(0, 4),
            available: products
        }
    };
}

function createPlayer() {
    currentPlace = gameData.places.findLocation(settings.startingPoint);
    playerMarker = map.createPlayer(currentPlace.getLatLong());
}

function moveToPlace(placeName) {
    if (currentPlace.getConnected().indexOf(placeName) > - 1) {
        currentPlace = gameData.places.findLocation(placeName);
        playerMarker.setLatLng(currentPlace.getLatLong());
        return true;
    }
}

function makeProfit() {
    var value = 0;
    this.data.stock.products.forEach(function(product) {
        value += currentPlace.getPopulationByProduct(product) * product.profit();
    });
    this.data.money += value;
    this.data.money = Number(this.data.money.toFixed(2));
}

function getMoney() {
    return this.data.money;
}

module.exports = {
    start: function(gData) {
        gameData = gData;
        this.data = restart();
        createPlayer();
    },
    getData: function() {
        return this.data;
    },
    moveToPlace: moveToPlace,
    makeProfit: makeProfit,
    getMoney: getMoney
};
