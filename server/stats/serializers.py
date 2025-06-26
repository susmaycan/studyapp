from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Stats

class StatTermSerializer(serializers.ModelSerializer):
     class Meta:
        model = Stats
        fields = ("id", "total", "ok", "ko", "term")
        read_only_fields = ("id", "total", "ok", "ko")


class StatsCreateSerializer(serializers.Serializer):
    terms = serializers.SerializerMethodField()

    def create(self, data):
        print(data)
