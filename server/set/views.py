from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from set.models import Set
from set.serializers import SetCreateSerializer, SetSerializer
from utils.constants import RestFrameworkActions
from utils.pagination import BasePagination


class SetViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = SetSerializer
    pagination_class = BasePagination

    def get_permissions(self):
        permission_classes = []
        if self.action in [
            RestFrameworkActions.CREATE,
            RestFrameworkActions.UPDATE,
            RestFrameworkActions.PARTIAL_UPDATE,
            RestFrameworkActions.DESTROY,
        ]:
            permission_classes.append(IsAuthenticated)

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = SetCreateSerializer(
            data=request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def get_queryset(self):
        search_word = self.request.query_params.get("search")
        queryset = Set.objects.all().order_by("name")

        if search_word:
            queryset = queryset.filter(
                Q(name__icontains=search_word)
            )
        return queryset
