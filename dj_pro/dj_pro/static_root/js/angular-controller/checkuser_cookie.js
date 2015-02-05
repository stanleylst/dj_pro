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

app.controller('LoginCtrl', function LoginCtrl($scope, $base64,$location,$window, AuthService, ipCookie) {
    $scope.credentials = { username: "", password: "",gologin : true};
    $scope.login = function(credentials) {
        $scope.credentials.password = $base64.encode($scope.credentials.password);
        AuthService.login(credentials,
        function(result){
            $scope.loginname = result["loginname"];
            $scope.message = 'now login';
            console.log($scope.loginname);
            ipCookie('loginname', $scope.loginname);
            $window.location.href = "/setgame/game_scripts";
            },  
        function(err){
            $scope.message = "password error or loginname not exists!"
            alert($scope.message);
            ipCookie('loginname', '');
            $window.location.href = "/setgame/users";
            console.log("something wrong here!");
    });     
}   
});
