from django.urls import include, path
from rest_framework import routers

from stats.views import StatsViewSet

router = routers.DefaultRouter()
router.register(r"stats", StatsViewSet, basename="stats")

urlpatterns = [
    path("", include(router.urls)),
]
