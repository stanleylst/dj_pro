vsftpd:
    pkg:
        - installed
    service:
        - running
        - reload: True
        - restart: True
        - watch:
            - file: /etc/vsftpd/vsftpd.conf
            - file: /etc/vsftpd/virtusers
            - file: /etc/pam.d/vsftpd

/etc/vsftpd/vsftpd.conf:
    file.managed:
        - source: salt://extra/ftp/vsftpd.conf

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

db-util:
    pkg:
        - installed

generate_pass:
    cmd.run:
        - names: 
            - db_load -T -t hash -f /etc/vsftpd/virtusers /etc/vsftpd/virtusers.db
            - service vsftpd restart
