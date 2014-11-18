from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    excuted_commands = serializers.RelatedField(many=True)

    class Meta:
        model = User
        fields = ('username','password','excuted_commands')

    def restore_object(self,attrs,instance=None):
        user = super(UserSerializer, self).restore_object(attrs,instance)
        user.set_password(attrs['password'])
        return user

class Game_ScriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game_Script
        fields = ('gamename','gamescript','access_ip')

class Excuted_CommandSerializer(serializers.ModelSerializer):
    user = serializers.Field(source='username.username')

    class Meta:
        model = Excuted_Command
        fields = ('username','game_script','user','excute_time')

class MusicSerializer(serializers.ModelSerializer):
    user = serializers.Field(source='username.username')

    class Meta:
        model = Music
        fields = ('username','music_file','music_img','user')

