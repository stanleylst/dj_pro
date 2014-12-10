from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Game_Script(models.Model):
    gamename = models.CharField(max_length=20)
    gamescript = models.CharField(max_length=50)
    access_ip = models.IPAddressField()

    def __unicode__(self):
        return '%s on game %s'%(self.gamescript,self.gamename)

class Excuted_Command(models.Model):
    game_script = models.CharField(max_length=150)
    excute_time = models.DateField(auto_now_add = True)
    username = models.ForeignKey(User,related_name = 'excuted_commands')

    def __unicode__(self):
        return '%s'%(self.username)   #use for serializer's user source

class Music(models.Model):
    username = models.ForeignKey(User,related_name = 'musics')
    music_file = models.FileField(upload_to='music')
    music_img = models.ImageField(upload_to='img')

    def __unicode__(self):
        return '%s'%(self.username)     # use for serializer's user source
