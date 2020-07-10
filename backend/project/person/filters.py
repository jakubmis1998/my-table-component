import django_filters
from .models import Person

class PersonFilter(django_filters.FilterSet):
    firstname = django_filters.CharFilter(lookup_expr='icontains')
    lastname = django_filters.CharFilter(lookup_expr='icontains')
    age = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = Person
        fields = '__all__'
