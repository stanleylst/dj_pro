apache2:
    pkg:
        - latest
    service:
        - running
        - enable: True
        - restart: True
        - watch:
            - file: /etc/apache2/apache2.conf
            {% if grains['ssl'] == 1 %}
            - file: /etc/apache2/sites-available/dj_pro_ssl
            {% endif%}
            - file: /etc/apache2/sites-available/dj_pro
            - file: /etc/apache2/httpd.conf
            - file: /etc/apache2/workers.properties
            - file: /etc/apache2/ports.conf
    cmd.run:
        - names:
            - a2enmod auth_sys_group
            - a2enmod auth_pam

/etc/apache2/ports.conf:
    file.managed:
        - source: salt://system/web/ports.conf

/etc/apache2/workers.properties:
    file.managed:
        - source: salt://system/web/workers.properties

/etc/apache2/apache2.conf:
    file.managed:
        - source: salt://system/web/apache2.conf
/etc/apache2/sites-available/dj_pro:
    file.managed:
        - source: salt://system/web/dj_pro.conf
    cmd.run:
        - unless: test -L /etc/apache2/sites-enabled/dj_pro
        - name: a2dissite default &&  a2ensite dj_pro && service apache2 restart 

