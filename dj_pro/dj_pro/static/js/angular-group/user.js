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
