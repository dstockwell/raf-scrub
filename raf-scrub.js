(function() {
  var _requestAnimationFrame = window.requestAnimationFrame;
  var _performanceNow = performance.now.bind(performance);
  var _dateNow = Date.now;

  var target = document.createElement('div');
  var player = target.animate([], {duration: Infinity});
  player.startTime = 0;

  var delta = 0;

  Date.now = function() {
    return _dateNow() + delta|0;
  };

  performance.now = function() {
    return _performanceNow() + delta;
  };

  window.requestAnimationFrame = function(f) {
    return _requestAnimationFrame(function(t) {
      var timelineCurrentTime = player.currentTime;
      delta = timelineCurrentTime - t;
      f(player.currentTime);
    });
  };
})();
