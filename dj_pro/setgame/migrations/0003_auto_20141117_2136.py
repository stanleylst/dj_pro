# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('setgame', '0002_music'),
    ]

    operations = [
        migrations.AlterField(
            model_name='excuted_command',
            name='game_script',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='music',
            name='music_file',
            field=models.FileField(upload_to=b'music'),
        ),
        migrations.AlterField(
            model_name='music',
            name='music_img',
            field=models.ImageField(upload_to=b'img'),
        ),
    ]
