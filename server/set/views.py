from rest_framework import mixins, viewsets

from set.models import Set
from set.serializers import SetSerializer
from utils.pagination import BasePagination


class SetViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = SetSerializer
    queryset = Set.objects.all().order_by("name")
    pagination_class = BasePagination
