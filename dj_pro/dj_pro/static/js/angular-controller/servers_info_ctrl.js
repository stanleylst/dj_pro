app.controller('servers_info_ctrl', function($scope, Servers_Info) {
    // Get all posts
    $scope.servers_infos = Servers_Info.query();
    
    Servers_Info.query(function(infos){
        $scope.infos = [];
        for(i in infos){
                $scope.infos.push(
                    {'eth0': infos[i].eth0,
                    'eth1': infos[i].eth1,
                    'hostname': infos[i].hostname,
                    'cpu_info': eval("("+infos[i].cpu_info+")"),
                    'memory_info': eval("("+infos[i].memory_info+")"),
                    'disk_info': eval("("+infos[i].disk_info+")"),
                    'netio_info': eval("("+infos[i].netio_info+")"),
                    'use_time_info': eval("("+infos[i].use_time_info+")"),
                    'sys_process_info': eval("("+infos[i].sys_process_info+")"),
                    'update_time' : infos[i].update_time,
                    });
            };
        
        $scope.info_base = [];
        for(i = 0; i < $scope.infos.length;i++){
            $scope.info_base.push({
            'eth0': $scope.infos[i].eth0,
            'eth1': $scope.infos[i].eth1,
            'hostname': $scope.infos[i].hostname,
            'cpu_num': $scope.infos[i].cpu_info.cpu_num,
            'memory_used': $scope.infos[i].memory_info.mem.used_percent + '%',
            'use_time': $scope.infos[i].use_time_info.start_time,
            'update_time' : $scope.infos[i].update_time
            });
            }; 
            console.log($scope.info_base);
            table_base = [{
                    field:'eth0',
                    title:'eth0'
                },{ 
                    field:'eth1',
                    title:'eth1'
                },{ 
                    field:'hostname',
                    title:'hostname'
                },{         
                    field:'update_time',
                    title:'update_time'
                }];
            table_base.splice(3,0,
            {   
                    field:'cpu_num',
                    title:'cpu_num'
            },{ 
                    field:'memory_used',
                    title: 'memory_used'
            },{ 
                    field:'use_time',
                    title:'use_time'
            });
            table_sys_basic = table_base.slice();
            console.log(table_base);
            console.log(table_sys_basic);
            $('#table-sys-basic').bootstrapTable({
            columns: table_base,
            data: $scope.info_base
            });
            /*$('#table-sys-basic1').bootstrapTable({
                columns: [{
                    field:'eth0',
                    title:'eth0'
                },{ 
                    field:'eth1',
                    title:'eth1'
                },{ 
                    field:'hostname',
                    title:'hostname'
                    }]*/
        });
});
