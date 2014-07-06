var clock = require('./game/gameClock'),
    map = require('./game/map'),
    gameData = require('./game/data/gameData');

map.createMap(function (argument) {
  gameData.getData(startGame);
});

function startGame() {
  clock.start();
  console.log('startGame!!!');
}

