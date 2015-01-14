app.factory('Servers_Info', ['$resource', function($resource) {
        return $resource('/servers/base_info/:id', {}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST',
                isArray: false,
                },
                });
}]);
