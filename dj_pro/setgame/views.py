from django.shortcuts import render


from rest_framework import generics,permissions,renderers
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser

from .models import *
from .serializers import *
# Create your views here.
import os,ast

# My scripts
import sys
sys.path.insert(0, 'dj_pro/scripts')
from lyingdragon_script import *
from pythonssh import *

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = (renderers.JSONRenderer, renderers.TemplateHTMLRenderer)

    def list(self,request,*args,**kwargs):
        response = super(UserList,self).list(request,*args,**kwargs)
        if request.accepted_renderer.format == 'html':
            return Response({'data': response.data}, template_name='form_user_login.html')
        return response

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

class Game_ScriptMixin(object):
    queryset = Game_Script.objects.all()
    serializer_class = Game_ScriptSerializer
    renderer_classes = (renderers.JSONRenderer, renderers.TemplateHTMLRenderer)

    def pre_save(self,obj):
        obj.username = self.request.user
        return super(Game_ScriptMixin,self).pre_save(obj)

class Game_ScriptList(Game_ScriptMixin,generics.ListCreateAPIView):

    def list(self,request,*args,**kwargs):
        response = super(Game_ScriptList,self).list(request,*args,**kwargs)
        if request.accepted_renderer.format == 'html':
            return Response({'data': response.data}, template_name='setgame.html')
        return response

class Game_ScriptDetail(Game_ScriptMixin,generics.RetrieveUpdateDestroyAPIView):
    pass

class Excuted_CommandMixin(object):
    queryset = Excuted_Command.objects.all()
    serializer_class = Excuted_CommandSerializer

class Excuted_CommandList(Excuted_CommandMixin,generics.ListCreateAPIView):

    def post(self,request,*args,**kwargs):
        response = super(Excuted_CommandList,self).post(request,*args,**kwargs)
        raw_start = [ item.encode('ascii') for item in ast.literal_eval(response.data['game_script']) ]
        start_command = start_game_args(raw_start)
        with open('/tmp/script_result.txt','w+') as f:
            f.write(start_command)
        hostfile = '/temp/host.json'
        cmd0 = "/mnt/db.bak/xl/wangss/new_shutdown.sh;sleep 3"
        print start_command
        cmd1 = "echo -e 'export log_stdout=1;/root/workspace/memcache/memcache' >/tmp/startmemcache.sh;screen -mdS memcache bash /tmp/startmemcache.sh"
        cmd2 = ("echo -e 'export log_stdout=1;{0} /root/workspace/lyingdragon/lyingdragon/lyingdragon'>/tmp/startlyingdragon.sh").format(start_command)
        cmd3 = 'screen -mdS lyingdragon bash /tmp/startlyingdragon.sh'
        cmd = cmd0 + ";" + cmd1 + ";" + cmd2 + ";" + cmd3
        #cmd = 'df -h'
        get_start = ssh(hostfile,cmd)
        result = get_start
        return Response({'result':result})

class Excuted_CommandDetail(Excuted_CommandMixin,generics.RetrieveUpdateDestroyAPIView):
    pass

class MusicMixin(object):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicList(MusicMixin,generics.ListCreateAPIView):
    parser_classes = (MultiPartParser,FormParser,)

class MusicDetail(MusicMixin,generics.RetrieveUpdateDestroyAPIView):
    pass
