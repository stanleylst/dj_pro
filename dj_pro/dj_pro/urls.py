from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib.auth.models import User,Group
from rest_framework import viewsets,routers

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    model = User

class GroupViewSet(viewsets.ModelViewSet):
    model = Group

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    #static
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.STATIC_ROOT}),

    #media
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.MEDIA_ROOT}),

    url(r'^setgame/', include('setgame.urls',
                            namespace='setgame')),

    url(r'^servers/', include('servers.urls',
                            namespace='servers')),

)
