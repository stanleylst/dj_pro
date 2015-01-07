openssh-server:
  pkg:
    - installed
  service:
    - running
    - name: ssh
    - enable: True
    - restart: True
    - reload: True
    - watch:
        - file: /etc/ssh/sshd_config
        - file: /etc/ssh/ssh_config

/etc/ssh/sshd_config:
    file.managed:
        - source: salt://system/ssh/sshd_config

/etc/ssh/ssh_config:
  file.append:
    - text: 
        - "StrictHostKeyChecking no"
        - "UserKnownHostsFile /dev/null"

/root/.ssh:
    file.directory:
        - mode: 700
        - user: root
        - makedirs: True
        
/root/.ssh/pub_keys:
    file.managed:
        - source: salt://system/ssh/pub_keys
        - user: root
        - mode: 600
