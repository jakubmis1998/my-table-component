from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from person import views

router = routers.DefaultRouter()
router.register(r'persons', views.PersonViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('', include(router.urls)),
    path(r'auth/', ObtainAuthToken.as_view())
]
