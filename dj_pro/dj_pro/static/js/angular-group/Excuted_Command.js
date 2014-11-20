app.factory('Excuted_Command', ['$resource', function($resource) {
        return $resource('/setgame/excuted_commands/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST',
                isArray: false
                },
                });
}]);


app.controller('excuted_command_ctrl', function($scope, Excuted_Command) {
    // Get all posts
    $scope.excuted_commands = Excuted_Command.query();

    $scope.Excuted_CommandData={};
    $scope.Excuted_CommandPost = function() {
        $scope.Excuted_CommandData.username = 1;
        $scope.Excuted_CommandData.game_script =[];
        $("input[type=checkbox]:checked").each ( function() {
            $scope.Excuted_CommandData.game_script.push( $(this).val() )
        });
        alert("Command:"+ $scope.Excuted_CommandData);
        $scope.Excuted_CommandData = Excuted_Command.save($scope.Excuted_CommandData);
    };

});
