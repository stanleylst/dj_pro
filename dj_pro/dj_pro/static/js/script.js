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
                isArray:true 
                }
                });
}]);            

app.factory('User', ['$resource', function($resource) {
        return $resource('/setgame/users/:id', {'pk': '@pk'}, 
                {
                    query: { 
                        method: 'GET',
                        //params: { action: "username" },
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

app.controller('excuted_command_ctrl', function($scope, Excuted_Command) {
  // Get all posts
  $scope.excuted_commands = Excuted_Command.query();

});    

app.controller('game_script_ctrl', function($scope, Game_Script) {
  // Get all posts
  $scope.game_scripts = Game_Script.query();

  $scope.game_len = function(e){return e.gamename=="dream"};

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

