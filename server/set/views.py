from django.db.models import Q
from rest_framework import filters, mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from set.models import Set
from set.serializers import (SetCreateSerializer, SetListSerializer,
                             SetSerializer)
from utils.constants import RestFrameworkActions
from utils.pagination import BasePagination


class SetViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    pagination_class = BasePagination
    queryset = Set.objects.all().order_by("name")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]

    def get_serializer_class(self):
        if self.action in [
            RestFrameworkActions.LIST,
        ]:
            return SetListSerializer
        return SetSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action in [
            RestFrameworkActions.CREATE,
            RestFrameworkActions.UPDATE,
            RestFrameworkActions.PARTIAL_UPDATE,
            RestFrameworkActions.DESTROY,
        ]:
            permission_classes.append(IsAuthenticated, IsAdminUser)

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = SetCreateSerializer(
            data=request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
