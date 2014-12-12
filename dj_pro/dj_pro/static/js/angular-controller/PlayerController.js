app.controller('PlayerController',
  function($scope,Music) {
    $scope.musics = Music.query();
    Music.query(function(musics){             //put on where values of query is going to deal with ;
    $scope.mymusic = musics;                         
    $scope.allmusiclist = [];
    for (i in $scope.mymusic){                                  //aquire musiclist array
        music_url = $scope.mymusic[i].music_file.split('/')
        img_url = $scope.mymusic[i].music_img.split('/')
        $scope.music_src = '/'+music_url[3]+'/'+music_url[4]+'/'+music_url[5]
        $scope.img_src = '/'+img_url[3]+'/'+img_url[4]+'/'+img_url[5]
        $scope.allmusiclist.push({id:i,owner: $scope.mymusic[i].user,src:decodeURI($scope.music_src), type : "audio/ogg",img:decodeURI($scope.img_src)});
    };
    
    console.log($scope.allmusiclist);
    $scope.music_owner = 'root';                                  //change the musiclist of owner;
    $scope.ownerchange = function(owner){
        $scope.music_owner = owner.username;
    };

    $scope.$watch('music_owner',function() {
    $scope.musiclist = [];
    for (i in $scope.allmusiclist){                             //choose the musiclist via owner;
        if ($scope.allmusiclist[i].owner == $scope.music_owner){
            $scope.musiclist.push($scope.allmusiclist[i]);
        };
    };

    for (i in $scope.musiclist){                                       // fix user musiclist id;
        $scope.musiclist[i].id=i;                                     
        console.log($scope.musiclist[i]);
    };

    $scope.playlist = $scope.musiclist;

    $scope.sum_num = parseInt($scope.playlist[$scope.playlist.length-1].id)+1;
    $scope.person_num = parseInt($scope.playlist.length);
    console.log($scope.sum_num);

    $scope.audio.play(0);
    console.log('come here')
    });
 
    $scope.repeat = false;                                   //the following is all to solve repeating a song
    $scope.canturn = true;
    $scope.loop = false;
    $scope.repeat_func = function(){
            $scope.repeat = !$scope.repeat;
            if($scope.repeat == true){ $scope.loop = false;};
    };      
    
    function canturn(){
        $scope.canturn = true;
        console.log('now can repeat');
    };  
    
    $scope.mynext = function(){
        if($scope.repeat == true){
            $scope.audio.next();
            $scope.canturn = false;
            setTimeout(canturn,100);
            }else{$scope.audio.next();};
    };      
    
    
    $scope.myprev = function(){
        if($scope.repeat == true){
            $scope.audio.prev();
            $scope.canturn = false;
            setTimeout(canturn,100);
            }else{$scope.audio.prev();};
    };      
    
    $scope.goloop = function(){
        $scope.loop = !$scope.loop;
        if($scope.loop == true){ $scope.repeat = false;};
    };
    
    $scope.$watch('audio.ended',function() {
        console.log($scope.audio.ended+'    '+$scope.audio.currentTrack);
        console.log('go here?');
        var curr_num = parseInt($scope.audio.currentTrack)-1;
        if($scope.audio.ended == undefined && $scope.repeat == true && $scope.canturn == true){
            console.log('go repeat');
            try{
                $scope.audio.play(curr_num-1);
                }catch(e){
                    $scope.mynext;
                    }
            };
        if($scope.audio.ended == true && $scope.repeat == true && $scope.canturn == true){
            console.log('last song');
            $scope.audio.play();
            $scope.canturn = false;
            setTimeout(canturn,100);
        };
        console.log('end watch');
        console.log($scope.audio.ended+'    '+$scope.audio.currentTrack);

        if( curr_num == -1){                                            //start music when open the web
            console.log('first');
            try{
                $scope.audio.play(0);}catch(e){
                    $scope.mynext;}
        };

        if( $scope.loop == true && $scope.repeat == false && $scope.audio.ended == true){
            console.log('return to first');
            try{
                setTimeout(function () {
                $scope.audio.play(0);},500);}catch(e){
                    console.log('loop here');
                    $scope.audio.play(0);}
        };

    });
});

    $scope.isCollapsed = true;

});
