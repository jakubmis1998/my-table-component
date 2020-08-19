from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from person import views

router = routers.DefaultRouter()
router.register(r'persons', views.PersonViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('', include(router.urls)),
    path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
