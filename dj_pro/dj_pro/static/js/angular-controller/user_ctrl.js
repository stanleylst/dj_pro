app.controller('user_ctrl', function($scope,ipCookie,$window, User) {
  // Get all posts
    $scope.users = User.query();

    $scope.isCollapsed = true;

    $scope.UserData = {};
    $scope.UserPost = function() {
        $scope.password_alert = '';
        var post = new User($scope.UserData);
        User.query(function(users){
            for( i in users){
                if($scope.UserData.username == users[i].username){
                        $scope.user_alert = "your register name has used";
                        return false;
                    };
                };
        alert("your register name is:"+ $scope.UserData.username+"\npassword is:"+$scope.UserData.password);
        if($scope.UserData.password != $scope.UserData.passwordcheck)
        {$scope.password_alert="password not match!"}else{
        console.log($scope.UserData);
        delete $scope.UserData.passwordcheck;
        console.log($scope.UserData);
        post.$save($scope.UserData,
        function(result){
        $window.location.href = "/setgame/game_scripts";
        ipCookie('loginname',$scope.UserData.username);
            },
        function(err){
        $window.location.href = "/setgame/users";
            console.log('here');
            });
        //$window.location.href = "/setgame/game_scripts";
        };
        });
        };
});
