var clock = require('./game/gameClock'),
    map = require('./game/map'),
    gameData = require('./game/data/gameData');

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

function startGame() {
  clock.start();
  map.createPlayer([52, 1]);
  updateUI();
}

function nextTurn() {
  clock.nextTurn();
  updateUI();
}

function updateUI() {
  var turn = clock.getTurn() + 2;
  day.html( turn + '-' + clock.getDay());
}