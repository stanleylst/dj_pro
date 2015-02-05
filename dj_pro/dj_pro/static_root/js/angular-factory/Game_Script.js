app.factory('Game_Script', ['$resource', function($resource) {
        return $resource('/setgame/game_scripts/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                }
                });
            
}]);
