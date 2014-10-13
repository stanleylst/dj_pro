from django.shortcuts import render


from rest_framework import generics,permissions

from .models import *
from .serializers import *
# Create your views here.
class UserList(generics.ListAPIView):
    model = User
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    model = User
    serializer_class = UserSerializer
    lookup_field = 'username'

class Game_ScriptList(generics.ListAPIView):
    model = Game_Script
    serializer_class = Game_ScriptSerializer

class Excuted_CommandList(generics.ListAPIView):
    model = Excuted_Command
    serializer_class = Excuted_CommandSerializer
