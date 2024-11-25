from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Term


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = ("id", "front", "back", "description", "back_alternatives")
        read_only_fields = (
            "creator",
            "id",
            "created_at",
        )


class TermSetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Term
        fields = ("id", "front")
        read_only_fields = ("id", "front")


class TermCreateSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    front = serializers.CharField(max_length=100)
    back = serializers.CharField(max_length=100)
    back_alternatives = serializers.CharField(max_length=300, required=False, allow_null=True, allow_blank=True)
    description = serializers.CharField(max_length=2000, required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Term
        fields = ["front", "back", "description", "back_alternatives", "creator"]
