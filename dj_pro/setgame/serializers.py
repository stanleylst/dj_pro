from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    excuted_commands = serializers.RelatedField(many=True)

    class Meta:
        model = User
        fields = ('username','password','excuted_commands')

class Game_ScriptSerializer(serializers.ModelSerializer):
    excuted_commands = serializers.RelatedField(many=True,read_only=True)

    class Meta:
        model = Game_Script
        fields = ('gamename','gamescript','access_ip','excuted_commands')

class Excuted_CommandSerializer(serializers.ModelSerializer):
    user = serializers.Field(source='username.username')
    script = serializers.Field(source='game_script.gamescript')

    class Meta:
        model = Excuted_Command
        fields = ('username','game_script','user','script','excute_time')
