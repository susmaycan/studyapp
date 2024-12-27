from django.db.models import Q
from rest_framework import filters, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)

from stats.models import Stats
from stats.serializers import StatsCreateSerializer, StatTermSerializer
from term.models import Term
from set.models import Set


class StatsViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = StatTermSerializer

    def get_queryset(self):
        set_id = self.request.query_params.get('set')
        set_obj = Set.objects.filter(id=set_id)

        if len(set_obj) == 0:
            return []

        terms = set_obj[0].terms.all()

        user = self.request.user
        return Stats.objects.filter(user=user, term__in=terms)

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["post"])
    def results(self, request):
        serializer = StatsCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stats = request.data["terms"]

        try:
            for stat in stats:
                term = Term.objects.get(id=stat["term"])
                stat_exists = Stats.objects.filter(term=term, user=self.request.user)
                if stat["ok"] is True:
                    ok = 1
                else:
                    ok = 0
                if stat["ko"] is True:
                    ko = 1
                else:
                    ko = 0

                if len(stat_exists) > 0:
                    stat_update_obj = stat_exists[0]
                    stat_update_obj.ok = stat_update_obj.ok + ok
                    stat_update_obj.ko = stat_update_obj.ko + ko
                    stat_update_obj.total = stat_update_obj.total + 1
                    stat_update_obj.save()
                else:
                    new_stat_obj = Stats.objects.create(
                        term=term, user=self.request.user, total=1, ok=ok, ko=ko
                    )
                    new_stat_obj.save()

        except:
            return Response("Term ids doesn't exist", status=HTTP_400_BAD_REQUEST)

        return Response(status=HTTP_201_CREATED)
