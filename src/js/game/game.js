var resources = require('./resources');
var screens = require('./screens/screens.js');

var game = {
  'onload' : function () {
    if (!me.video.init('screen', 480, 320, true, 'auto')) return;

    me.audio.init('mp3,ogg');
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(resources);
    me.state.change(me.state.LOADING);
  },
  'loaded' : function () {
    me.state.set(me.state.MENU, new screens.TitleScreen());
    me.state.set(me.state.PLAY, new screens.PlayScreen());
    me.state.change(me.state.PLAY);
  }
};

module.exports = game;
