from django.shortcuts import render


from rest_framework import generics,permissions

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

    def pre_save(self,obj):
        obj.username = self.request.user
        return super(Game_ScriptMixin,self).pre_save(obj)

class Game_ScriptList(Game_ScriptMixin,generics.ListCreateAPIView):
    pass

class Game_ScriptDetail(Game_ScriptMixin,generics.RetrieveUpdateDestroyAPIView):
    pass

class Excuted_CommandMixin(object):
    model = Excuted_Command
    serializer_class = Excuted_CommandSerializer

class Excuted_CommandList(Excuted_CommandMixin,generics.ListCreateAPIView):
    pass

class Excuted_CommandDetail(Excuted_CommandMixin,generics.RetrieveUpdateDestroyAPIView):
    pass
