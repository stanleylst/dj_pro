vsftpd:
    pkg:
        - installed
    service:
        - running
        - enable: True
        - reload: True
        - restart: True
        - watch:
            - file: /etc/vsftpd/virtusers
            - file: /etc/pam.d/vsftpd
            {% if grains['os'] == 'Debian' or grains['os'] == 'Ubuntu' %}
            - file: /etc/vsftpd.conf
            {% elif grains['os'] == 'CentOS' or grains['os'] == 'RedHat' %}
            - file: /etc/vsftpd/vsftpd.conf
            {% endif %}

db-util:
    pkg:
        - installed

/etc/vsftpd:
    file.directory:
        - mode: 755
        - makedirs: True

/etc/vsftpd/virtusers:
    file.managed:
        - source: salt://extra/ftp/virtusers

/etc/vsftpd/vconf:
    file.directory:
        - mode: 755 
        - makedirs: True

/etc/vsftpd/vconf/user1:
    file.managed:
        - source: salt://extra/ftp/user1

/etc/pam.d/vsftpd:
    file.managed:
        - source: salt://extra/ftp/vsftpd

generate_pass:
    cmd.run:
        - names:
            - db_load -T -t hash -f /etc/vsftpd/virtusers /etc/vsftpd/virtusers.db
            {% if grains['os'] == 'Debian' or grains['os'] == 'Ubuntu' %}
            - touch /etc/vsftpd/user_list
            {% endif %}

{% if grains['os'] == 'Debian' or grains['os'] == 'Ubuntu' %}
/etc/vsftpd.conf:
    file.managed:
        - source: salt://extra/ftp/vsftpd_apt.conf

vsftp:
    user.present:
        - shell: /bin/nologin
        - home: /home/vsftp
        - uid: 14000
        - gid: 65534

/home/vsftp:
    file.directory:
        - dir_mode: 600
        - file_mode: 600
        - user: vsftp
        - group: root
{% elif grains['os'] == 'CentOS' or grains['os'] == 'RedHat' %}
/etc/vsftpd/vsftpd.conf:
    file.managed:
            - source: salt://extra/ftp/vsftpd_yum.conf
{% endif %}







/dj_pro/dj_pro:
    file.directory:
        - user: vsftp
        - group: root
