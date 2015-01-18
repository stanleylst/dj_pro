app.factory('Servers_Info', ['$resource', function($resource) {
        return $resource('/servers/base_info/:eth1', {eth1:'@eth1'}, {
            query:{
                method: 'GET',
                isArray: true
                },
            save: {
                method: 'POST',
                isArray: false,
                },
            find:{
                method: 'GET',
                isArray: false,
                params:{eth1:'@eth1'},
                },
                });
}]);
