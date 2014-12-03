from django.shortcuts import render


from rest_framework import generics,permissions,renderers
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser

from .models import *
from .serializers import *
# Create your views here.
import os

class UserList(generics.ListCreateAPIView):
    model = User
    serializer_class = UserSerializer
    renderer_classes = (renderers.JSONRenderer, renderers.TemplateHTMLRenderer)

    def list(self,request,*args,**kwargs):
        response = super(UserList,self).list(request,*args,**kwargs)
        if request.accepted_renderer.format == 'html':
            return Response({'data': response.data}, template_name='login.html')
        return response

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    model = User
    serializer_class = UserSerializer
    lookup_field = 'username'

class Game_ScriptMixin(object):
    model = Game_Script
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
    model = Excuted_Command
    serializer_class = Excuted_CommandSerializer

class Excuted_CommandList(Excuted_CommandMixin,generics.ListCreateAPIView):

    def post(self,request,*args,**kwargs):
        response = super(Excuted_CommandList,self).post(request,*args,**kwargs)
        with open('/tmp/django.txt','w+') as f:
            f.write(response.data['game_script'])
        result = 'result succeed!'
        return Response({'result':result})

class Excuted_CommandDetail(Excuted_CommandMixin,generics.RetrieveUpdateDestroyAPIView):
    pass

class MusicMixin(object):
    model = Music
    serializer_class = MusicSerializer

class MusicList(MusicMixin,generics.ListCreateAPIView):
    parser_classes = (MultiPartParser,FormParser,)

class MusicDetail(MusicMixin,generics.RetrieveUpdateDestroyAPIView):
    pass
