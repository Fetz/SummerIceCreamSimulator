var clock = require('./game/gameClock'),
    map = require('./game/map'),
    player = require('./game/player'),
    gameData = require('./game/data/gameData'),
    gameStart = false;

map.createMap(function(mapLayer, markers) {
  gameData.start(mapLayer, markers, startGame);
});

var day = $('#day'),
    hours = $('#hours'),
    money = $('#money'),
    week = $('#week-day'),
    body = $('body'),
    products = $('#products');

$('.close').on('click', function(e) {
  $(e.target).parent().removeClass('showUI');
});

$('#intro-page').on('click', function(e) {
    $(e.target).css('display', 'none');
});

$('#nextTurn').on('click', function() {
  player.makeProfit();
  nextTurn();
});

$('#buy').on('click', function() {
  products.toggleClass('showUI');
});


function startGame(data) {
  console.log('startGame', data);
  clock.start();
  player.start(data);
  map.prettify();
  map.getMap().featureLayer.on('click', function(e) {
    var layer = e.layer;
    var title = layer.options.title;
    body.toggleClass('show-travel', player.canMoveToPlace(title));
    body.toggleClass('setup-shop', player.getPlaceTitle() == title);
    $('.travelButton').on('click', function(e) {
      if (body.hasClass('setup-shop')) {
        player.makeProfit();
        nextTurn();
      }else if (player.moveToPlace(title)) {
        nextTurn();
        body.toggleClass('setup-shop', true);
      }
      e.stopPropagation();
    });
    $('.prettyPopup').on('click', function(e) {
      layer.closePopup();
    });
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
  week.html( clock.getWeek() );
  hours.html( clock.getHour() );
  day.html( clock.getDay());
  money.html( '£' + player.getMoney() );
}