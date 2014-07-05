module.exports = me.ScreenObject.extend({
  onResetEvent: function() {
    // title screen
    me.game.world.addChild(
        new me.SpriteObject (
            0, 0, me.loader.getImage('title_screen')
        )
    );
  },
  onDestroyEvent: function() {
    
  }
});
