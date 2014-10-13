from django.conf.urls import patterns, url, include

from .views import *

user_urls = patterns('',
        url(r'^$',UserList.as_view(),name='user-list'),
        url(r'^/(?P<username>[0-9a-zA-Z-]+)$',UserDetail.as_view(),name='user-detail'),
        )

game_script_urls = patterns('',
        url(r'^$',Game_ScriptList.as_view(),name='game_script-list'),
        )

excuted_command_urls = patterns('',
        url(r'^$',Excuted_CommandList.as_view(),name='excuted_command-list'),
        )

urlpatterns = patterns('',
        url(r'^users',include(user_urls)),
        url(r'^game_scripts',include(game_script_urls)),
        url(r'^excuted_commands',include(excuted_command_urls)),
        )
