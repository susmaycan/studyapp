from django.db.models import Q
from rest_framework import filters, mixins, status, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from term.models import Term
from term.serializers import TermCreateSerializer, TermSerializer
from utils.constants import RestFrameworkActions
from utils.mixins import EnablePartialUpdateMixin
from utils.pagination import BasePagination


class TermViewSet(
    EnablePartialUpdateMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = TermSerializer
    pagination_class = BasePagination
    queryset = Term.objects.all().order_by("front")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["front", "back", "back_alternatives", "description"]
    ordering_fields = ["front", "created_at"]
    ordering = ["front"]

    def get_permissions(self):
        permission_classes = []
        if self.action in [
            RestFrameworkActions.CREATE,
            RestFrameworkActions.UPDATE,
            RestFrameworkActions.PARTIAL_UPDATE,
            RestFrameworkActions.DESTROY,
        ]:
            permission_classes.append(IsAuthenticated)
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = TermCreateSerializer(
            data=request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
