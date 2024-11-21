from django.db.models import Q
from rest_framework import filters, mixins, viewsets

from term.models import Term
from term.serializers import TermSerializer
from utils.pagination import BasePagination


class TermViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = TermSerializer
    pagination_class = BasePagination
    queryset = Term.objects.all().order_by("front")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["front", "back", "back_alternatives", "description"]
    ordering_fields = ["front", "created_at"]
    ordering = ["front"]
