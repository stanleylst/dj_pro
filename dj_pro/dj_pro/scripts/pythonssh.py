#!/usr/bin/python
# -*- coding: UTF-8 -*-
import paramiko
import sys
sys.path.insert(0, 'scripts')
from rest_json import *

def ssh(hostfile,cmd):
    s = paramiko.SSHClient()
    s.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    s.connect(rest_json(hostfile).hostname.rest_get,\
            rest_json(hostfile).port.rest_get,\
            rest_json(hostfile).username.rest_get,\
            rest_json(hostfile).passwd.rest_get,\
            timeout=5)
    stdin,stdout,stderr = s.exec_command(cmd)
    out = stdout.read()
    s.close()
    return out

if __name__=='__main__':
    hostfile = '/temp/host.json'
    cmd = 'df -h'
    result = ssh(hostfile,cmd)
    print result

