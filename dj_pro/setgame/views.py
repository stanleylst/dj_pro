from django.shortcuts import render


<<<<<<< HEAD
from rest_framework import generics,permissions,renderers
from rest_framework.response import Response
=======
from rest_framework import generics,permissions
>>>>>>> f3d636ebd216b98999fb3ee888e84ca91dcfff77

from .models import *
from .serializers import *
# Create your views here.
class UserList(generics.ListCreateAPIView):
    model = User
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    model = User
    serializer_class = UserSerializer
    lookup_field = 'username'

class Game_ScriptMixin(object):
    model = Game_Script
    serializer_class = Game_ScriptSerializer
<<<<<<< HEAD
    renderer_classes = (renderers.JSONRenderer, renderers.TemplateHTMLRenderer)
=======
>>>>>>> f3d636ebd216b98999fb3ee888e84ca91dcfff77

    def pre_save(self,obj):
        obj.username = self.request.user
        return super(Game_ScriptMixin,self).pre_save(obj)

class Game_ScriptList(Game_ScriptMixin,generics.ListCreateAPIView):
<<<<<<< HEAD

    def list(self,request,*args,**kwargs):
        response = super(Game_ScriptList,self).list(request,*args,**kwargs)
        if request.accepted_renderer.format == 'html':
            return Response({'data': response.data}, template_name='normal/navigationtest.html')
        return response
=======
    pass
>>>>>>> f3d636ebd216b98999fb3ee888e84ca91dcfff77

class Game_ScriptDetail(Game_ScriptMixin,generics.RetrieveUpdateDestroyAPIView):
    pass

class Excuted_CommandMixin(object):
    model = Excuted_Command
    serializer_class = Excuted_CommandSerializer

class Excuted_CommandList(Excuted_CommandMixin,generics.ListCreateAPIView):
    pass

class Excuted_CommandDetail(Excuted_CommandMixin,generics.RetrieveUpdateDestroyAPIView):
    pass
