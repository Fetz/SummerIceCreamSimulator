var clock = require('./game/gameClock'),
    map = require('./game/map'),
    player = require('./game/player'),
    gameData = require('./game/data/gameData'),
    gameStart = false;

map.createMap(function(mapLayer, markers) {
  gameData.start(mapLayer, markers, startGame);
});

var day = $('#day'),
    products = $('#products');

$('.close').on('click', function(e) {
  $(e.target).parent().removeClass('showUI');
});

$('#nextTurn').on('click', function() {
  nextTurn();
});

$('#buy').on('click', function() {
  products.toggleClass('showUI');
});

function startGame(data) {
  console.log('startGame', data);
  clock.start();
  player.start(data);
  map.getMap().featureLayer.on('click', function(e) {
    player.moveToPlace(e.layer.options.title);
  });
  updateUI();
  gameStart = true;
}

window.requestAnimationFrame = function() {
  if (gameStart)
    player.update();
};

function nextTurn() {
  clock.nextTurn();
  updateUI();
}

function updateUI() {
  var turn = clock.getTurn() + 2;
  day.html( turn + '-' + clock.getDay());
}