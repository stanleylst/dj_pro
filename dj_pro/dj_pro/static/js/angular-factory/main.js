var app = angular.module('myApp', ['mediaPlayer','ngResource','ipCookie','ui.bootstrap','angular-md5','base64']);
    app.config(function($interpolateProvider) { 
      $interpolateProvider.startSymbol('((');
      $interpolateProvider.endSymbol('))');
    });
    app.run(
    function($http) {
        //$http.defaults.headers.post['X-CSRFToken'] = $.cookie('csrftoken');
        // Add the following two lines
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    });


