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

app.controller('LoginCtrl', function LoginCtrl($scope, $base64,$location, AuthService, $cookieStore) {
    $scope.credentials = { username: "", password: "",gologin : true};
    $scope.login = function(credentials) {
        $scope.credentials.password = $base64.encode($scope.credentials.password);
        AuthService.login(credentials,
        function(result){
            $scope.loginname = result["loginname"];
            console.log($scope.loginname);
            $cookieStore.put('loginname', $scope.loginname);
            },  
        function(err){
            $scope.loginname = "something wrong here,run it again!"
            console.log("something wrong here!");
    });     
}   
});
