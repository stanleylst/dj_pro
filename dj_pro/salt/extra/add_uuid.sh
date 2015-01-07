 sed -i "/id: /d" /etc/salt/minion 
 a="id: `uuid`" 
 echo $a >> /etc/salt/minion
