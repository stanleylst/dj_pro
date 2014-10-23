var app = angular.module("myappstatic", []);

app.controller('AppController', function($scope,$http){
    tmp = [];
    $http.get('/blogtest/showblog/').success(function(response){
    tmp.push(response["results"]);
    $scope.results=tmp;
    $scope.aa='bose';
});
});
