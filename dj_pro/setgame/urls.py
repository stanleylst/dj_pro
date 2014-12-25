from django.conf.urls import patterns, url, include

from .views import *

user_urls = patterns('',
        url(r'^$',UserList.as_view(),name='user-list'),
        url(r'^/(?P<username>[0-9a-zA-Z-]+)$',UserDetail.as_view(),name='user-detail'),
        )

game_script_urls = patterns('',
        url(r'^$',Game_ScriptList.as_view(),name='gamescript-list'),
        url(r'^/(?P<pk>[0-9]+)/$',Game_ScriptDetail.as_view(),name='gamescript-detail'),
        )

excuted_commands_urls = patterns('',
        url(r'^$',Excuted_CommandList.as_view(),name='excuted_commands-list'),
        url(r'^/(?P<pk>[0-9]+)/$',Excuted_CommandList.as_view(),name='excuted_commands-detail'),
        )

music_urls = patterns('',
        url(r'^$',MusicList.as_view(),name='musics-list'),
        url(r'^/(?P<pk>[0-9]+)/$',MusicList.as_view(),name='musics-detail'),
        )

login_urls = patterns('',
        url(r'^$',LoginList.as_view(),name='login-list'),
        url(r'^/(?P<username>[0-9a-zA-Z-]+)$',LoginDetail.as_view(),name='login-detail'),
        )

register_urls = patterns('',
        url(r'^$',RegisterList.as_view(),name='register-list'),
        url(r'^/(?P<username>[0-9a-zA-Z-]+)$',RegisterDetail.as_view(),name='register-detail'),
        )

urlpatterns = patterns('',
        url(r'^users',include(user_urls)),
        url(r'^game_scripts',include(game_script_urls)),
        url(r'^excuted_commands',include(excuted_commands_urls)),
        url(r'^musics',include(music_urls)),
        url(r'^login',include(login_urls)),
        url(r'^register',include(register_urls)),
        )

