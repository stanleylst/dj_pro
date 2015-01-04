nfs_common:
    pkg.installed:
        - name: nfs-common

nfs_server:
    pkg.installed:
        - name: nfs-kernel-server
    service.running:
        - name: nfs-kernel-server
        - require:
            - pkg: nfs-kernel-server
    
/mnt/data:
    file.directory:
        - mode: 755
        - makedirs: True

update_exports:
    cmd.run:
        - name: exportfs -ra
        - require:
            - pkg: nfs-kernel-server
        - watch:
            - file: server_exports

server_exports:
    file.managed:
        - name: /etc/exports
        - source: salt://nfs/exports
        - user: root
        - group: root
        - mode: 644
