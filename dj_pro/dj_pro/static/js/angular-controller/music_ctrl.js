app.controller('music_ctrl', function($http,$scope, Music) { 
  // Get all posts                                   
    $scope.musics = Music.query();                     

    $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file                   
    fd.append("file", files[0]);
    fd.append("file", files[1]);
    fd.append("name", "username");


    $http.post('/setgame/musics/:id', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success("... all right! ..." ).error( "...damn!..." );

    };
});
