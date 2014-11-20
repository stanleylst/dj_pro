app.controller('PlayerController',
  function($scope,Music) {
    $scope.musics = Music.query();
    Music.query(function(musics){             //对query的值处理一定要放在这里
    $scope.mymusic = musics;
    $scope.musiclist = [];
    for (i in $scope.mymusic)                                  //取得musiclist数组   
        $scope.musiclist.push({owner: $scope.mymusic[i].username,src:'/media/'+$scope.mymusic[i].music_file, type : "audio/ogg",img:'/media/'+$scope.mymusic[i].music_img});
    $scope.playlist1= $scope.musiclist;
    });
});

app.filter('MinSecFilter', function () {
    return function (value, max) {
        if (value == max) return 'All';
            var m = parseInt(value / 60);
            var s = parseInt(value % 60);
            var mStr = (m > 0) ? m >= 10 ? m  : '0' + m : '00';
            var sStr = (s > 0) ? s >= 10 ? s  : '0' + s : '00';
            var glue = (mStr && sStr) ? ':' : '';
        return mStr + glue + sStr;
            };
});
