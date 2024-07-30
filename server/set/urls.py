from django.urls import include, path
from rest_framework import routers

from set.views import SetViewSet

router = routers.DefaultRouter()
router.register(r"sets", SetViewSet, basename="sets")

urlpatterns = [
    path("", include(router.urls)),
]
