from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Term


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = ("id", "front", "back", "description", "progress", "back_alternatives")
        read_only_fields = ("id", "front", "back", "description", "progress", "back_alternatives")


class TermSetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Term
        fields = ("id", "front")
        read_only_fields = ("id", "front")
