from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from .filters import PersonFilter
from .models import Person
from .serializers import UserSerializer, PersonSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = '__all__'
    filterset_class = PersonFilter
