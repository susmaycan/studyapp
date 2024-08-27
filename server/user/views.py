from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from rest_framework.viewsets import GenericViewSet

from user.models import User
from user.serializers import UserLoginSerializer, UserSerializer
from utils.constants import RestFrameworkActions


class AuthViewSet(GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"])
    def login(self, request):
        print("🚀 ~ request:", request)

        serializer = UserLoginSerializer(data=request.data)
        print("🚀 ~ serializer:", serializer)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {"user": UserSerializer(user).data, "access_token": token}
        return Response(data, status=HTTP_201_CREATED)
