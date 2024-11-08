from rest_framework import mixins, viewsets
from django.db.models import Q

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


    def get_queryset(self):
        search_word = self.request.query_params.get("search")
        queryset = Term.objects.all().order_by("front")

        if search_word:
            queryset = queryset.filter(
                Q(front__icontains=search_word) |
                Q(back__icontains=search_word) |
                Q(back_alternatives__icontains=search_word)
            )
        return queryset
