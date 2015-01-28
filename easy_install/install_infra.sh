pip install django==1.7
pip install djangorestframework=3
pip install django-bower==5.0.1
pip install httplib2==0.9
pip install Jinja2==2.7.3
pip install markdown==2.5.2
pip install django-filter==0.9.2
pip install paramiko==1.15.1
pip install Pillow==2.6.1
pip install Pillow-PIL==0.1dev
post_ver=`dpkg -l|grep -E "postgresql-[0-9].[0-9]"|grep -Eo "[0-9]\.[0-9]"|uniq`
apt-get install postgresql-server-dev-$post_ver
pip install psycopg2==2.5.4
pip install pycrypto==2.6.1
pip install PyYAML==3.11
pip install requests==2.5.1
pip install simplejson==3.6.5
pip install six==1.8.0
pip install uWSGI==2.0.9
cd ../dj_pro
./manage.py migrate
psql -h db -U postgres dj_pro -f ../easy_install/dj_pro.sql
#plumber (1.3)
#pep8 (1.5.7)
#ecdsa (0.11)
#wsgiref (0.1.2)
#zope.component (4.2.1)
#zope.deprecation (4.1.1)
#zope.event (4.0.3)
#zope.interface (4.1.1)
#zope.lifecycleevent (4.0.3)
#MarkupSafe (0.23)
#msgpack-python (0.4.3)
#node (0.9.14)
#nodeenv (0.11.1)
#odict (1.5.1)
