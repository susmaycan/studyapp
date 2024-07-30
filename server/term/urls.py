from django.urls import include, path
from rest_framework import routers

from term.views import TermViewSet

router = routers.DefaultRouter()
router.register(r"terms", TermViewSet, basename="terms")

urlpatterns = [
    path("", include(router.urls)),
]
