# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Excuted_Command',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('excute_time', models.DateField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Game_Script',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gamename', models.CharField(max_length=20)),
                ('gamescript', models.CharField(max_length=50)),
                ('access_ip', models.IPAddressField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='excuted_command',
            name='game_script',
            field=models.ForeignKey(related_name=b'excuted_commands', to='setgame.Game_Script'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='excuted_command',
            name='username',
            field=models.ForeignKey(related_name=b'excuted_commands', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
