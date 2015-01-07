add_uuid:
    cmd.script:
        - source: salt://extra/add_uuid.sh
        - user: root
        - group: root
        - shell: /bin/bash
