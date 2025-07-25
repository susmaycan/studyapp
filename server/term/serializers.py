from rest_framework import serializers

from .models import Term, TermSegment
from stats.serializers import StatTermSerializer
from stats.models import Stats

class TermSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermSegment
        fields = ["text", "reading"]

class TermSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()
    segments = TermSegmentSerializer(many=True, read_only=True)

    class Meta:
        model = Term
        fields = ("id", "front", "back", "description", "back_alternatives", "stats", "segments")
        read_only_fields = (
            "creator",
            "id",
            "created_at",
        )

    def get_stats(self, instance):
        term_id = instance.id
        user = self.context["request"].user
        if user.is_anonymous:
            return None
        else:
            stats = Stats.objects.filter(term__id=term_id, user=user).first()
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
    segments = TermSegmentSerializer(many=True)


    class Meta:
        model = Term
        fields = ["front", "back", "description", "back_alternatives", "creator", "segments"]

    def create(self, validated_data):
        segments_data = validated_data.pop("segments")
        term = Term.objects.create(**validated_data)

        for segment_data in segments_data:
            TermSegment.objects.create(term=term, **segment_data)

        return term
