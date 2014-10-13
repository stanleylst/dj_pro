from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    excuted_commands = serializers.HyperlinkedIdentityField('excuted_commands',view_name = 'game_script-detail',lookup_field = 'username')

    class Meta:
        model = User
        fields = ('username','excuted_commands')

class Game_ScriptSerializer(serializers.ModelSerializer):
    excuted_commands = serializers.HyperlinkedIdentityField('excuted_commands',view_name = 'game_script-list')

    class Meta:
        model = Game_Script
        fields = ('gamename','gamescript','access_ip','excuted_commands')

class Excuted_CommandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Excuted_Command
        fields = ('game_script','username','excute_time')
