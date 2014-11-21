app.factory('audio', ['$document', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
}]);

app.factory('player', ['audio','$timeout','$rootScope', function(audio,$timeout,$rootScope) {
    url = '/media/music/機巧少女は傷つかない_op.mp3';
    audio.src = url;
    
    var player = {
        playing: false,
    //current: null,
        ready: false,
    //mytime: null,
    
    play: function() {
      // If we are playing, stop the current playback
      if (player.playing) player.stop();
      //var url = '/media/music/機巧少女は傷つかない_op.mp3'; // from the npr API
      player.name = decodeURI(audio.src.split("/")[5]);
      audio.play(); // Start playback of the url
      player.playing = true;
    },
    
    stop: function() {
      if (player.playing) {
        audio.pause(); // stop playback
        // Clear the state of the player
        player.ready = player.playing = false;
        //player.current = null;
      } 
    },
    
    modifyTime: function(mytime) {
        audio.currentTime = mytime;
        return audio.currentTime;
    },

    currentTime: function() {
        return audio.currentTime;
        },
    currentDuration: function() {
        return parseInt(audio.duration);
        }
    };

    audio.addEventListener('timeupdate', function(evt) {
        $rootScope.$apply(function() {
        player.progress = player.currentTime();
        player.currenttime = player.currentDuration();
        player.progress_percent = player.progress / player.currenttime;
        });
    });

    audio.addEventListener('ended', function() {
        $rootScope.$apply(player.stop());
    });

    audio.addEventListener('canplay', function(evt) {
        $rootScope.$apply(function() {
        player.ready = true;
        });
    });

  return player;
}]);
