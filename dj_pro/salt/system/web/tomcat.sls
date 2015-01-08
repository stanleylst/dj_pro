install_tomcat:
    cmd.run:
        - name: cp /mnt/db.bak/xl/bins/wly/apache-tomcat-7.0.20.tar.gz /tmp && tar xf apache-tomcat-7.0.20.tar.gz && rm -rf /usr/local/tomcat && mv apache-tomcat-7.0.20/ /usr/local/tomcat
        - cwd: /tmp
        - user: root
    file.managed:
        - name: /etc/init.d/tomcat
        - source: salt://system/web/tomcat
        - mode: 755

tomcat:
    service:
        - name: tomcat
        - running
        - enable: True

java:
    cmd.run:
        - cwd: /tmp
        - user: root
        - name: cp /mnt/db.bak/xl/bins/wly/jre6.bin /tmp/ && ./jre6.bin > /dev/null 
    file.append:
        - name: /etc/profile
        - text:
            - export JAVA_HOME=/usr/lib/jre6
            - export PATH=$PATH:$JAVA_HOME/bin
            - export CLASSPATH=.$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:.

/usr/lib/jre6:
    file.directory:
        - makedirs: True
        - mode: 755
        - user: root
    cmd.run:
        - onlyif: test -d /usr/lib/jre6
        - name: rm -rf /usr/lib/jre6/* && cp -r  /tmp/jre1.6.0_26/* /usr/lib/jre6/ && rm -rf /tmp/jre1.6.0_26
            
/usr/local/tomcat/conf/server.xml:
    file.managed:
        - source: salt://system/web/server.xml
        - makedirs: True
        - watch_in:
            - pkg: tomcat
