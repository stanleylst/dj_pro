nginx:
    pkg:
        - installed
    service.running:
        - require:
            - pkg: nginx
        - watch:
            - file: /tmp/index.html

/tmp/index.html:
    file.managed:
        - source: salt://system/web/index.html

/etc/nginx/nginx.conf:
    file.managed:
        - source: salt://system/web/nginx.conf

/etc/nginx/local_nginx.conf:
    file.managed:
        - source: salt://system/web/local_nginx.conf
