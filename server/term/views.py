from rest_framework import mixins, viewsets

from term.models import Term
from term.serializers import TermSerializer
from utils.pagination import BasePagination


class TermViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = TermSerializer
    queryset = Term.objects.all().order_by("front")
    pagination_class = BasePagination
