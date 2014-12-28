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
        fields = ('id','username','password','excuted_commands','musics')

    #add user
    def create(self,validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    #modify user
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
