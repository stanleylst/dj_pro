app.controller('PlayerController',
  function($scope,Music) {
    $scope.musics = Music.query();
    Music.query(function(musics){             //put on where values of query is going to deal with ;
    $scope.mymusic = musics;                         
    $scope.allmusiclist = [];
    for (i in $scope.mymusic){                                  //aquire musiclist array
        $scope.allmusiclist.push({id:i,owner: $scope.mymusic[i].user,src:'/media/'+$scope.mymusic[i].music_file, type : "audio/ogg",img:'/media/'+$scope.mymusic[i].music_img});
    };

    $scope.music_owner = 'root';                                  //change the musiclist of owner;
    $scope.ownerchange = function(owner){
        $scope.music_owner = owner.username;
        console.log(owner.username);
    };

    $scope.$watch('music_owner',function() {
    $scope.musiclist = [];
    for (i in $scope.allmusiclist){                             //choose the musiclist via owner;
        console.log($scope.allmusiclist[i].owner);
        if ($scope.allmusiclist[i].owner == $scope.music_owner){
            $scope.musiclist.push($scope.allmusiclist[i]);
        };
    };

    $scope.playlist= $scope.musiclist;

    console.log($scope.playlist);
    $scope.sum_num = parseInt($scope.playlist[$scope.playlist.length-1].id)+1;

    $scope.audio.play(0);
    });
 
    $scope.repeat = false;                                   //the following is all to solve repeating a song
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
            setTimeout(canturn,20);
            }else{$scope.audio.next();};
    };      
    
    
    $scope.myprev = function(){
        if($scope.repeat == true){
            $scope.audio.prev();
            $scope.canturn = false;
            setTimeout(canturn,20);
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
            setTimeout(canturn,20);
        };
        console.log('end watch');
        console.log($scope.audio.ended+'    '+$scope.audio.currentTrack);
        if( curr_num == -1){
            console.log('first');
            $scope.audio.play(0);
        };

    });
});

    $scope.isCollapsed = true;

});