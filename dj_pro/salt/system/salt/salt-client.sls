# use salt-ssh to install salt-minion
# Make sure salt is installed and running
uuid:
    pkg.installed:
        - name: uuid

salt_minion:
    pkg.installed:
        - name: salt-minion

salt-master-key:
    ssh_auth.present:
        - user: root
        - source: salt://system/ssh/pub_keys

add_uuid:
    cmd.script:
        - source: salt://extra/add_uuid.sh
        - user: root
        - group: root
        - shell: /bin/bash

salt_restart:
    cmd.run:
        - name: service salt-minion restart
    
