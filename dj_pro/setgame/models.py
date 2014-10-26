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
    game_script = models.ForeignKey(Game_Script,related_name = 'excuted_commands')
    excute_time = models.DateField(auto_now_add = True)
    username = models.ForeignKey(User,related_name = 'excuted_commands')

    def __unicode__(self):
        return '%s used %s at %s'%(self.username,self.game_script,self.excute_time)