from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from term.serializers import TermSerializer

from .models import Set


class SetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    terms = TermSerializer(many=True)

    class Meta:
        model = Set
        fields = ("id", "name", "description", "terms", "picture")
        read_only_fields = ("id", "name", "description", "terms", "picture")
