var data = require('../data');
var entities = require('../entities/entities');

module.exports = me.ScreenObject.extend({

  onResetEvent: function() {
    data.score = 0;

    me.levelDirector.loadLevel('level01');
    this.HUD = new entities.HUD.Container();
    me.game.world.addChild(this.HUD);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.HUD);
  }
});
