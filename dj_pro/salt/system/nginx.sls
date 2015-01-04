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
        - source: salt://index.html
