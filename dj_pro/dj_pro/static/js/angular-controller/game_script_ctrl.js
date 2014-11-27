app.controller('game_script_ctrl', function($scope, Game_Script) {
    // Get all posts
    $scope.game_scripts = Game_Script.query();

    Game_Script.query(function(game_scripts){             //对query的值处理一定要放在这里 
        $scope.gamename = game_scripts;
        $scope.gamename_len = [];
        //开始去重
        for (i in $scope.gamename){                                  //取得gamename数组     
            $scope.gamename_len.push($scope.gamename[i].gamename);};
        $scope.gamename_uniq = [];
        $.each($scope.gamename_len, function(i, el){                  //取得去重数组
            if($.inArray(el, $scope.gamename_uniq) === -1) $scope.gamename_uniq.push(el);
        }); 
        
        $scope.gamename_sum_ip = [];
        $scope.gamename_use_has_ip = [];
        for (i in $scope.gamename){                                  //取得gamename数组   
                $scope.gamename_sum_ip.push($scope.gamename[i].access_ip);
                $scope.gamename_use_has_ip.push($scope.gamename[i].gamename+$scope.gamename[i].access_ip);
                };
                $scope.gamename_uniq_ip = [];
                $.each($scope.gamename_sum_ip, function(i, el){                  //取得去重数组
                    if($.inArray(el, $scope.gamename_uniq_ip) === -1) $scope.gamename_uniq_ip.push(el);
                }); 

        $scope.has_ip = function(script,ip){
            combine = script+ip;
            for(i in $scope.gamename_use_has_ip){
                if(combine == $scope.gamename_use_has_ip[i])
                    {return true};

                };
            };
      
        }); 

    $scope.isCollapsed1 = true;
    $scope.isCollapsed2 = true;
});    
