app.factory('Game_Script', ['$resource', function($resource) {
        return $resource('/setgame/game_scripts/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                }
                });
            
}]);

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

