from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Term
from stats.serializers import StatTermSerializer
from stats.models import Stats
class TermSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()
    class Meta:
        model = Term
        fields = ("id", "front", "back", "description", "back_alternatives", "stats")
        read_only_fields = (
            "creator",
            "id",
            "created_at",
        )

    def get_stats(self, instance):
        term_id = instance.id
        user = self.context["request"].user

        stats = Stats.objects.filter(term=term_id, user=user).first()
        return StatTermSerializer(stats).data


class TermCreateSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    front = serializers.CharField(max_length=100)
    back = serializers.CharField(max_length=100)
    back_alternatives = serializers.CharField(
        max_length=300, required=False, allow_null=True, allow_blank=True
    )
    description = serializers.CharField(
        max_length=2000, required=False, allow_null=True, allow_blank=True
    )

    class Meta:
        model = Term
        fields = ["front", "back", "description", "back_alternatives", "creator"]
