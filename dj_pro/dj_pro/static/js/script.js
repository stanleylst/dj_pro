var app = angular.module('myApp', ['ngResource','ngCookies']);
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
        return $resource('/setgame/game_scripts/:id', {'pk': '@pk'}, {
                });
}]);            

app.factory('User', ['$resource', function($resource) {
        return $resource('/setgame/users/:id', {'pk': '@pk'}, 
                {
                    query: { 
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

app.controller('excuted_command_ctrl', function($scope, Excuted_Command) {
  // Get all posts
  $scope.excuted_commands = Excuted_Command.query();

});    

app.controller('game_script_ctrl', function($scope, Game_Script) {
  // Get all posts
  $scope.game_scripts = Game_Script.query();

});    

app.controller('user_ctrl', function($scope, User) {
  // Get all posts
    $scope.users = User.query();

    $scope.newuser = {};
    $scope.myuser = fuction(){
        var user = new User($scope.newuser);
        user.$save();
        //console.log('post success');
        }

});

