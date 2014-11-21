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
    $scope.repeat_func = function(){
            $scope.repeat = !$scope.repeat;
    };      
    
    function mkchange(){
        $scope.repeat = true;
        console.log('here');
    };  
    
    $scope.mynext = function(){
        if($scope.repeat == true){
            $scope.repeat = false;
            $scope.audio.next();
            setTimeout(mkchange,3000);
            }else{$scope.audio.next();};
    };      
    
    
    $scope.myprev = function(){
        if($scope.repeat == true){
            $scope.repeat = false;
            $scope.audio.prev();
            setTimeout(mkchange,3000);
            }else{$scope.audio.prev();};
    };      
 
    $scope.gorepeat = setInterval(function()
    {
    if ( $scope.repeat == true && $scope.audio.playing == true && Math.round($scope.audio.currentTime) in [0,1] ){
        $scope.repeat = false;
        $scope.audio.prev();
        setTimeout(mkchange,3000);
        console.log('now');
        }else if($scope.repeat == true && $scope.audio.ended == true){
        $scope.repeat = false;
        $scope.audio.play();
        setTimeout(mkchange,3000);
        console.log('last one');
        };
 }, 1000);
    });

    $scope.isCollapsed = true;

});
