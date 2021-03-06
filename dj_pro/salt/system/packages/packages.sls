libssl0.9.8:
     pkg.installed:
         - skip_verify: True
         - skip_suggestions: True
         - version: '0.9.8o-4squeeze7'
         - refresh: True
wlypkg:
    cmd.run:
        - name: apt-get clean all
    pkg.latest:
        - skip_verify: True
        - env: 
            - LC_ALL: en_US.UTF-8
        - pkgs:
            - perl
            - vim
            - apache2
            - redis-server
            - make
            - gcc
            - g++
            - emacs
            - dpkg-dev
            - libssl-dev
            - snmpd
            - ntpdate
            - sudo
            - curl
            - libperl-dev
            - rrdtool
            - screen
            - gdb
            - postgresql-8.4
            - libltdl-dev
            - libtinyxml-dev
            - libprotobuf-dev
            - apache2-utils
            - libapache2-mod-jk
            - libapache2-mod-auth-pam
            - libapache2-mod-auth-sys-group
            - unrar
            - php5
            - php-elisp
            - php5-pgsql
            - redfox
            - libprotobuf6
            - libluabind0.9.0
            - unzip
            - libtcmalloc-minimal0
            - php5-curl
            - python-psutil
            - python-pygresql
            - python-psycopg2
            - python-progressbar
            - lrzsz
            - nagios-plugins
            - snmp
            - libc6
            - libcurl3
            - liboauth0
            - liboauth-dev
            - libgmp3c2
            - python-apt
            - libboost1.42-dev
            - libboost-date-time1.42-dev
            - libboost-filesystem1.42-dev
            - libboost-graph1.42-dev
            - libboost-graph-parallel1.42-dev
            - libboost-iostreams1.42-dev
            - libboost-math1.42-dev
            - libboost-mpi1.42-dev
            - libboost-program-options1.42-dev
            - libboost-regex1.42-dev
            - libboost-serialization1.42-dev
            - libboost-signals1.42-dev
            - libboost-system1.42-dev
            - libboost-test1.42-dev
            - libboost-thread1.42-dev
            - libboost-wave1.42-dev
            - nagios
