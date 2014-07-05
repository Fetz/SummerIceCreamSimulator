var data = require('../data');

var HUD = {

};

HUD.Container = me.ObjectContainer.extend({
  init: function() {
    this.parent();
    this.isPersistent = true;
    this.collidable = false;
    this.z = Infinity;
    this.name = 'HUD';
    this.addChild(new HUD.ScoreItem(5, 5));
  }
});

HUD.ScoreItem = me.Renderable.extend({  

  init: function(x, y) {
    this.parent(new me.Vector2d(x, y), 10, 10); 
    this.score = -1;
    this.floating = true;
  },

  update : function () {
    if (this.score !== data.score) {  
      this.score = data.score;
      return true;
    }
    return false;
  },

  draw : function (context) {

  }

});

module.exports = HUD;
