app.controller('CookieCtrl', function ($scope,$window, $location, $rootScope, ipCookie,User) {
    $scope.loginname = ipCookie('loginname');
    if (!$scope.loginname){
        $scope.loginname = 'welcome to login';
        };
    $scope.bump = function () {
        var lastVal = ipCookie('lastValue');
        if (!lastVal) {
            $rootScope.lastVal = 1;
        } else {
        $rootScope.lastVal = lastVal + 1;
        console.log($rootScope.lastVal);
        $window.location.href = "/setgame/game_scripts";
        console.log($location.absurl());
        };
        ipCookie('lastValue', $rootScope.lastVal);
        };

    $scope.logform_action = function(){
        var de_loginname = ipCookie('loginname');
        if (!de_loginname){
            $scope.log_value = 'login';
            }else{ $scope.log_value = 'logout';};
    };
    
    $scope.log_action = function(){
        if ($scope.log_value == 'login'){$window.location.href = "/setgame/users";};
        if ($scope.log_value == 'logout'){ipCookie('loginname', '');$window.location.href = "/setgame/users";};
    };
});
app.controller('ShowerCtrl', function () {
});

