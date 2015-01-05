/etc/apt/sources.list:
    file.managed:
        - source: salt://system/apt-sources/sources.lists
