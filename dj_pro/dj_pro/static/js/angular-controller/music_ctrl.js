app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(up_combine, uploadUrl){
        $scope.loadinfo = '';
        var fd = new FormData();
        for( key in up_combine){
            fd.append(key, up_combine[key]);
        }
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            $scope.loadinfo = 'upload successful';
        })
        .error(function(){
            $scope.loadinfo = 'upload failed';
        });
    }
}]);

app.controller('music_ctrl', ['$scope', 'fileUpload', 'User',function($scope, ipCookie,fileUpload,User){
    $scope.userid = User.query(); 
    console.log($scope.userid);
    /*
    $scope.uploadFile = function(){
        username = ipCookie('loginname');
        if (username == undefined || username == ''){
            $scope.loadinfo = 'please login first';
            return false };
        var up_combine = {'music_file':$scope.music_file,
                          'music_img':$scope.music_img,
                           'username':username};
        
        var uploadUrl = "/setgame/musics";
        fileUpload.uploadFileToUrl(up_combine, uploadUrl);
    };*/    
}]);

