var app = angular.module('myApp', ['mediaPlayer','ngResource','ngCookies','ui.bootstrap']);
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
        return $resource('/setgame/excuted_commands/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST',
                isArray: false
                },
                });
}]);

app.factory('Game_Script', ['$resource', function($resource) {
        return $resource('/setgame/game_scripts/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                }
                });
            
}]);            

app.factory('Music', ['$resource', function($resource) {
        return $resource('/setgame/musics/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST'
                },
            remove: {
                method: 'DELTET'
                },
                });                                                
}]);            

app.factory('User', ['$resource', function($resource) {
        return $resource('/setgame/users/:id', {}, 
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
    
    $scope.Excuted_CommandData={};
    $scope.Excuted_CommandPost = function() {
        $scope.Excuted_CommandData.username = 1;
        $scope.Excuted_CommandData.game_script =[];
        $("input[type=checkbox]:checked").each ( function() {
            $scope.Excuted_CommandData.game_script.push( $(this).val() )
        });
        alert("Command:"+ $scope.Excuted_CommandData);
        $scope.Excuted_CommandData = Excuted_Command.save($scope.Excuted_CommandData);
    };

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
    
    $scope.UserData = {};
    $scope.UserPost = function() {
        var post = new User($scope.UserData);
        alert("your register name is:"+ $scope.UserData.username+"\npassword is:"+$scope.UserData.password);
        post.$save($scope.UserData);
        $location.path(/11/);
        window.location.reload();
        $scope.$apply(); 
        }
});

app.controller('music_ctrl', function($http,$scope, Music) { 
  // Get all posts                                   
    $scope.musics = Music.query();                     
   
    $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);
    fd.append("file", files[1]);
    fd.append("name", "username");
    

    $http.post('/setgame/musics/:id', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success("... all right! ..." ).error( "...damn!..." );

};   

    $scope.isCollapsed = true;                       
});

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
      
app.controller('PlayerController',
  function($scope,Music) {
    $scope.musics = Music.query();                     
    Music.query(function(musics){             //对query的值处理一定要放在这里
    $scope.mymusic = musics;                         
    $scope.musiclist = [];
    for (i in $scope.mymusic)                                  //取得musiclist数组   
        $scope.musiclist.push({id:i,owner: $scope.mymusic[i].username,src:'/media/'+$scope.mymusic[i].music_file, type : "audio/ogg",img:'/media/'+$scope.mymusic[i].music_img});
    $scope.playlist1= $scope.musiclist;
 
    
    $scope.repeat = false;
    $scope.repeat_func = function(){
            $scope.repeat = !$scope.repeat;
    };
    
    function mkchange(){
        $scope.repeat = true;
        console.log('here');
    };
    
    $scope.mynext = function(){
        if($scope.repeat == true){
            $scope.repeat = false;
            $scope.audio1.next();
            setTimeout(mkchange,3000);
            }else{$scope.audio1.next();};
    };
    
     
 $scope.myprev = function(){
     if($scope.repeat == true){
         $scope.repeat = false;
         $scope.audio1.prev();
         setTimeout(mkchange,3000);
         }else{$scope.audio1.prev();};
 };

    $scope.gorepeat = setInterval(function()
    {
    if ( $scope.repeat == true && $scope.audio1.playing == true && Math.round($scope.audio1.currentTime) in [0,1] ){
        $scope.repeat = false;
        $scope.audio1.prev();
        setTimeout(mkchange,3000);
        console.log('now');
        }else if($scope.repeat == true && $scope.audio1.ended == true){
        $scope.repeat = false;
        $scope.audio1.play();
        setTimeout(mkchange,3000);
        console.log('last one');
        };
 }, 1000);
    });

    $scope.isCollapsed = true;

});

app.controller('TimeController', ['$scope', 'timer',
  function($scope, timer) {
  $scope.timer = timer;
}]);
