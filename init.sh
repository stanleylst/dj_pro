# start to change to use ansible,salt will be deprecated
source /dj_pro/bin/activate
cd /dj_pro
export ANSIBLE_HOSTS=/dj_pro/ansible_hosts
cd dj_pro
uwsgi --ini local_uwsgi.ini 
screen -mdS uwgsi_log tail -f /tmp/uwsgi.log 
screen -mdS nginx_log tail -f /var/log/nginx/access.log  
screen -mdS runserver ./manage.py runserver 0.0.0.0:8888
