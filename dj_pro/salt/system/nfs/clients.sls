# NFS Client states
nfs_client:
    pkg.installed:
        - name: nfs-common

/mnt/db.bak:
    file.directory:
        - mode: 755
        - makedirs: True
    mount.mounted:
        - device: 192.168.70.130:/mnt/data
        - fstype: nfs
        - mkmnt: True
        - opts:
            - defaults

/etc/fstab:
    file.append:
        - text: 192.168.70.130:/mnt/data /mnt/db.bak nfs rw,tcp,intr 0 0
