app.controller('PlayerController',
  function($scope,Music) {
    $scope.musics = Music.query();
    Music.query(function(musics){             //对query的值处理一定要放在这里
    $scope.mymusic = musics;                         
    $scope.musiclist = [];
    for (i in $scope.mymusic)                                  //取得musiclist数组   
        $scope.musiclist.push({id:i,owner: $scope.mymusic[i].username,src:'/media/'+$scope.mymusic[i].music_file, type : "audio/ogg",img:'/media/'+$scope.mymusic[i].music_img});
    $scope.playlist= $scope.musiclist;

    $scope.sum_num = parseInt($scope.playlist[$scope.playlist.length-1].id)+1;
    
 
    $scope.repeat = false;
    $scope.canturn = true;
    $scope.repeat_func = function(){
            $scope.repeat = !$scope.repeat;
    };      
    
    function canturn(){
        $scope.canturn = true;
        console.log('now can repeat');
    };  
    
    $scope.mynext = function(){
        if($scope.repeat == true){
            $scope.audio.next();
            $scope.canturn = false;
            setTimeout(canturn,200);
            }else{$scope.audio.next();};
    };      
    
    
    $scope.myprev = function(){
        if($scope.repeat == true){
            $scope.audio.prev();
            $scope.canturn = false;
            setTimeout(canturn,200);
            }else{$scope.audio.prev();};
    };      

    $scope.$watch('audio.ended',function() {
        console.log($scope.audio.ended+'    '+$scope.audio.currentTrack);
        console.log('go here?');
        var curr_num = parseInt($scope.audio.currentTrack)-1;
        if($scope.audio.ended == undefined && $scope.repeat == true && $scope.canturn == true){
            console.log('go repeat');
            $scope.audio.play(curr_num-1);
            };
        if($scope.audio.ended == true && $scope.repeat == true && $scope.canturn == true){
            console.log('last song');
            $scope.audio.play();
            $scope.canturn = false;
            setTimeout(canturn,200);
        };

    });
});

    $scope.isCollapsed = true;

});
