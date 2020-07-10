from rest_framework import viewsets, filters
from .models import Person
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PersonSerializer
from .filters import PersonFilter


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = '__all__'
    filterset_class = PersonFilter
