from rest_framework import serializers
from .models import *

class Game_ScriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game_Script
        fields = ('gamename','gamescript','access_ip')

class Excuted_CommandSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='*',read_only=True)

    class Meta:
        model = Excuted_Command
        fields = ('username','game_script','excute_time','user')

class MusicSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='*',read_only=True)

    class Meta:
        model = Music
        fields = ('username','music_file','music_img','user')

class UserSerializer(serializers.ModelSerializer):
    excuted_commands = Excuted_CommandSerializer(read_only=True,many=True)
    musics = MusicSerializer(read_only=True,many=True)

    class Meta:
        model = User
        fields = ('username','password','excuted_commands','musics')

    def restore_object(self,attrs,instance=None):
        user = super(UserSerializer, self).restore_object(attrs,instance)
        user.set_password(attrs['password'])
        return user
