app.factory('Music', ['$resource', function($resource) {
        return $resource('/setgame/musics/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST'
                },
            remove: {
                method: 'DELTET'
                },
                });
}]);            
