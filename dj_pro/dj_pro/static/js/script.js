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


app.controller('PlayerController', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = '/media/Boys_be_smile.mp3';
  $scope.audio.name = $scope.audio.src.split("/")[4];
  var updateClock = function() 
    {    
        $scope.clock = new Date();   
    };  
  var timer = setInterval(function() 
    {    
        $scope.$apply(updateClock);  
    }, 1000);  
    //updateClock();
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });
}]);

