var settings = require('./settings').player;

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

module.exports = {
    start: function() {
        this.data = restart();
    },
    getData: function() {
        return this.data;
    }
};
