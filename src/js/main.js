var clock = require('./game/gameClock'),
    map = require('./game/map'),
    gameData = require('./game/data/gameData');

map.createMap(function(mapLayer, markers) {
  gameData.start(mapLayer, markers, startGame);
});

function startGame() {
  clock.start();
  console.log('startGame!!!');
}

