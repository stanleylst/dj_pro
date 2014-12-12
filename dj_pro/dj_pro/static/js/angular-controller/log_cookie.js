app.controller('CookieCtrl', function ($scope,$window, $location, $rootScope, $cookieStore,User) {
    $scope.loginname = $cookieStore.get('loginname');
    if (!$scope.loginname){
        $scope.loginname = 'welcome to login';
        };
    $scope.bump = function () {
        var lastVal = $cookieStore.get('lastValue');
        if (!lastVal) {
            $rootScope.lastVal = 1;
        } else {
        $rootScope.lastVal = lastVal + 1;
        console.log($rootScope.lastVal);
        $window.location.href = "/setgame/game_scripts";
        console.log($location.absurl());
        };
        $cookieStore.put('lastValue', $rootScope.lastVal);
        };

    $scope.log_action = function(){
        var de_loginname = $cookieStore.get('loginname');
        if (!de_loginname){
            $scope.log_value = 'login';
            }else{ $scope.log_value = 'logout';};
    };
});
app.controller('ShowerCtrl', function () {
});

