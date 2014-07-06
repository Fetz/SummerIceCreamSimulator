var settings = require('./settings').time;
    moment = require('../vendor/moment');

var dateFormat = 'DD/MM/YYYY';
var turn, startDate, 
    endDate = moment(settings.endDate, dateFormat),
    speed = settings.speed;

var gameClock = {
    start: function () {
        turn = -1;
        startDate = moment(settings.startDate, dateFormat);
    },
    nextTurn: function () {
        turn++;
    },
    getDay: function () {
        return moment(startDate.toDate()).add('days', turn * speed).format('DD/MM/YYYY');
    },
    getHour: function () {
        return turn % 2 ? 'Morning' : 'MidDay';
    },
    getWeek: function () {
        return moment(startDate.toDate()).add('days', turn * speed).format('dddd');
    },
    getTurn: function() {
        return turn;
    }
};

module.exports = gameClock;
