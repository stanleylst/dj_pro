import psutil
import datetime,sys
import requests,json

# because of not having Domain Name Resolution and using virtual Domain,
# do not forget to add domain and ip to /etc/hosts

class Serverinfo(object):
    base_url = 'http://gj.com/system/'
    post_api = {'cpu': base_url + 'cpu_info',
            'memory': base_url + 'memory',
            'disk': base_url + 'disk',
            'netio': base_url + 'netio',
            'use_time': base_url + 'use_time',
    }

    def __init__(self):
        self._cpu = dict()
        self._memory = dict()
        self._disk = dict()
        self._netio = dict()
        self._use_time = dict()
        self._sys_process = dict()
        self.cpu_info = self._cpu_info()
        self.memory_info = self._memory_info()
        self.disk_info = self._disk_info()
        self.netio_info = self._netio_info()
        self.use_time_info = self._use_time_info()
        self.sys_process_info = self._sys_process_info()


    def __getattr__(self, method):
        return 'no this attribute!'

    def send_data(self):
        seturl = [[self.post_api['cpu'],self.cpu_info],\
                    [self.post_api['memory'],self.memory_info],\
                    [self.post_api['disk'],self.disk_info],\
                    [self.post_api['netio'],self.netio_info],\
                    [self.post_api['use_time'],self.use_time_info],\
                    ]
        for [i,j] in seturl:
            data = json.dumps(j)
            r = requests.post(i,data=data)
            try:
                if r.status_code != 200:
                    raise
                else:
                    print json.dumps(j) +" has sended data to "+i
            except:
                print json.dumps(j) +" did not send data to "+i


    def _cpu_info(self):
        for k,i in enumerate(psutil.cpu_times(percpu=True)):
            self._cpu['cpu'] = k
            self._cpu['usertime'] = i.user
            self._cpu['systime'] = i.system
            self._cpu['idle'] =i.idle
        return self._cpu

    def _memory_info(self):
        memory_get = psutil.virtual_memory()
        swap_get = psutil.swap_memory()
        self._memory['mem'] = dict()
        self._memory['swap'] = dict()
        self._memory['mem']['total'] = memory_get.total/1024/1024
        self._memory['mem']['used'] = memory_get.used/1024/1024
        self._memory['mem']['free'] = memory_get.free/1024/1024
        self._memory['mem']['used_percent'] = memory_get.percent
        self._memory['swap']['total'] = swap_get.total/1024/1024
        self._memory['swap']['used'] = swap_get.used/1024/1024
        self._memory['swap']['free'] = swap_get.free/1024/1024
        self._memory['swap']['used_percent'] = swap_get.percent
        return self._memory

    def _disk_info(self):
        disk_get = [(i.mountpoint,psutil.disk_usage(i.mountpoint)) for i in psutil.disk_partitions()]
        for n,(i,j) in enumerate(disk_get):
            n = str(n)
            mount = 'mountpoint' + n
            self._disk[mount] = dict()
            self._disk[mount]['mountpoint'] = i
            self._disk[mount]['total'] = j.total/1024/1024
            self._disk[mount]['used'] = j.used/1024/1024
            self._disk[mount]['free'] = j.free/1024/1024
            self._disk[mount]['percent'] = j.percent
        return self._disk

    def _netio_info(self):
        netio_get = psutil.net_io_counters()
        self._netio['bytes_sent'] = netio_get.bytes_sent
        self._netio['bytes_recv'] = netio_get.bytes_recv
        self._netio['packets_sent'] = netio_get.packets_sent
        self._netio['packets_recv'] = netio_get.packets_recv
        return self._netio

    def _use_time_info(self):
        self._use_time['count_user'] = len(psutil.users())
        self._use_time['start_time'] = datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")
        return self._use_time

    def _sys_process_info(self):
        sys_process_get = psutil.pids()
        for n in sys_process_get:
            try:
                proc = psutil.Process(n)
            except:
                pass
            process_nu = 'pro_' + str(n)
            self._sys_process[process_nu] = dict()
            self._sys_process[process_nu]['exe_dir'] = proc.exe()
            self._sys_process[process_nu]['name'] = proc.name()
            self._sys_process[process_nu]['dir'] = proc.cwd()
            self._sys_process[process_nu]['status'] = proc.status()
            self._sys_process[process_nu]['create_time'] = datetime.datetime.fromtimestamp(proc.create_time()).strftime("%Y-%m-%d %H:%M:%S")
            self._sys_process[process_nu]['memory_percent'] = proc.memory_percent()
        return self._sys_process

if __name__ == '__main__':
    svr = Serverinfo()
    svr.send_data()
    #print svr.cpu_info
    #print svr.memory_info
    #print svr.disk_info
    #print svr.netio_info
    #print svr.use_time_info
    #print svr.sys_process_info


