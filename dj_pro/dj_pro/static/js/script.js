var app = angular.module('myApp', ['ngResource','ngCookies','ui.bootstrap']);
    app.config(function($interpolateProvider) { 
      $interpolateProvider.startSymbol('(('); 
      $interpolateProvider.endSymbol('))');
    });
    app.run(
    function($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        // Add the following two lines
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    });

app.factory('Excuted_Command', ['$resource', function($resource) {
        return $resource('/setgame/excuted_commands/:id', {pk:'@pk'}, {
                });
}]);

app.factory('Game_Script', ['$resource', function($resource) {
        return $resource('/setgame/game_scripts/:id', {}, {
            get:{
                method: 'GET',
                transformResponse: function (data) {return angular.fromJson(data).list},
                isArray: true
                }
                });
}]);            

app.factory('User', ['$resource', function($resource) {
        return $resource('/setgame/users/:id', {'pk': '@pk'}, 
                {
                    query: { 
                        method: 'GET',
                        //params: { action: "username" },
                        isArray: true ,
                    },
                    save: {
                        method: 'POST'
                    },
                    remove: {
                        method: 'DELTET'
                    },
                });
}]);            

app.controller('excuted_command_ctrl', function($scope, Excuted_Command) {
  // Get all posts
  $scope.excuted_commands = Excuted_Command.query();

});



app.controller('game_script_ctrl', function($scope, Game_Script) {
  // Get all posts
  $scope.game_scripts = Game_Script.query();
 
    Game_Script.query(function(game_scripts){             //对query的值处理一定要放在这里 
        $scope.gamename = game_scripts;
        $scope.gamename_len = [];
        //开始去重
        for (i in $scope.gamename)                                  //取得gamename数组              
            $scope.gamename_len.push($scope.gamename[i].gamename);
        $scope.gamename_uniq = [];
        $.each($scope.gamename_len, function(i, el){                  //取得去重数组
            if($.inArray(el, $scope.gamename_uniq) === -1) $scope.gamename_uniq.push(el);
        });
        
     }); 

  $scope.isCollapsed = true;
});    

app.controller('user_ctrl', function($scope, User) {
  // Get all posts
    $scope.users = User.query();

    $scope.isCollapsed = true;
    
    $scope.postData = {};
    $scope.newPost = function() {
        var post = new User($scope.postData);
        alert("your register name is:"+ $scope.postData.username+"\npassword is:"+$scope.postData.password);
        post.$save($scope.postData);
        $location.path(/11/);
        window.location.reload();
        $scope.$apply(); 
        }
});


app.factory('audio', ['$document', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
}]);

app.factory('player', ['audio','$rootScope', function(audio,$rootScope) {
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

app.filter('MinSecFilter', function () {
    return function (value, max) {      
        if (value == max) return 'All';      
            var m = parseInt(value / 60);      
            var s = parseInt(value % 60);      
            var mStr = (m > 0) ? m >= 10 ? m  : '0' + m : '00';      
            var sStr = (s > 0) ? s >= 10 ? s  : '0' + s : '00';      
            var glue = (mStr && sStr) ? ':' : '';      
        return mStr + glue + sStr;    
            };  
});


app.factory('timer',['$rootScope',function($rootScope){
    var updateClock = function()
    {    
        $rootScope.clock = new Date();
    };
    var timer = setInterval(function()
    {    
      $rootScope.$apply(updateClock);
    }, 1000);
}]);
      
app.controller('TimeController', ['$scope', 'timer',
  function($scope, timer) {
  $scope.timer = timer;
}]);


app.controller('PlayerController', ['$scope', 'player',
  function($scope, player) {
  $scope.player = player;
}]);

