app.factory('AuthService', ['$resource',
function($resource) {
    return $resource(
        '/setgame/:action/', ///:password',
        {action:'@action',
        },
        {
            login: {
                method:'post',
                data: '@credentials',
                params: {
                    action: 'login',
                }   
            },  
            logout: {
                method:'GET',
                params: {
                    action: 'logout'
                }   
            }   
        }
    );
}]);

app.controller('LoginCtrl', function LoginCtrl($scope, $base64,$location,$window, AuthService, $cookieStore) {
    $scope.credentials = { username: "", password: "",gologin : true};
    $scope.login = function(credentials) {
        $scope.credentials.password = $base64.encode($scope.credentials.password);
        AuthService.login(credentials,
        function(result){
            $scope.loginname = result["loginname"];
            $scope.message = 'now login';
            console.log($scope.loginname);
            $cookieStore.put('loginname', $scope.loginname);
            $window.location.href = "/setgame/game_scripts";
            },  
        function(err){
            $scope.message = "something wrong here,run it again!"
            alert($scope.message);
            console.log("something wrong here!");
    });     
}   
});
