app.controller('google_ctrl',function($scope){
    $scope.search = '';
    $scope.$watch('search',function() {
        $scope.gosearch = $scope.search.split(' ').join('+');
        $scope.googleurl = 'http://www.out1000.com/search/?q=' + $scope.gosearch + '&btnG=%E6%90%9C%E7%B4%A2&hl=zh-CN&newwindow=1';
        $scope.stackoverflowurl = 'http://stackoverflow.com/search?q=' + $scope.gosearch;
        $scope.searchcodeurl = 'https://searchcode.com/?q=' + $scope.gosearch;
        });
});
