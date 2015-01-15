app.controller('servers_detail_ctrl', function($scope, Servers_Info) {
    // Get all posts
    
    servers_only = Servers_Info.get({eth1:'192.168.70.130'},function(){
        console.log(servers_only.eth0);
        table_detail_base = [{
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

        table_detail_memory = [{
            field:'mem_used_percent',
            title:'mem_used_percent'
        },{ 
            field:'mem_total',
            title:'mem_total'
        },{ 
            field:'mem_free',
            title:'mem_free'
        },{ 
            field:'swap_used_percent',
            title:'swap_used_percent'
        },{
            field:'swap_total',
            title:'swap_total'
        },{
            field:'swap_free',
            title:'swap_free'
        }];

       table_detail_cpu = [{
            field:'cpu_num',
            title:'cpu_num'
        },{ 
            field:'idel',
            title:'idel'
        },{ 
            field:'usertime',
            title:'usertime'
        },{
            field:'systime',
            title:'systime'
        }];

        table_detail_mount = [{
            field:'mountpoint',
            title:'mountpoint'
        },{ 
            field:'total',
            title:'total(M)'
        },{ 
            field:'percent',
            title:'percent(%)'
        },{ 
            field:'free',
            title:'free(M)'
        },{ 
            field:'used',
            title:'used(M)'
        }];
            
        table_detail_netio = [{
            field:'packets_sent',
            title:'packets_sent(M)'
        },{ 
            field:'packets_recv',
            title:'packets_recv(M)'
        },{ 
            field:'bytes_sent',
            title:'bytes_sent(M)'
        },{ 
            field:'bytes_recv',
            title:'bytes_recv(M)'
        }];

        table_detail_process = [{
        







    });
