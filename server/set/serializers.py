from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from term.models import Term
from term.serializers import TermSerializer

from .models import Set


class SetSerializer(serializers.ModelSerializer):
    terms = TermSerializer(many=True)

    class Meta:
        model = Set
        fields = ("id", "name", "description", "terms", "picture")
        read_only_fields = ("id", "creator", "created_at")


class SetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ("id", "name", "description", "picture")
        read_only_fields = ("id", "creator", "created_at")


class SetCreateSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    description = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    name = serializers.CharField(max_length=50)
    picture = serializers.CharField(max_length=300, required=False, allow_blank=True, allow_null=True)
    terms_batch = serializers.CharField(
        max_length=2000, allow_blank=True, allow_null=True, required=False
    )
    terms = serializers.SlugRelatedField(
        many=True, slug_field="id", queryset=Term.objects.all(), required=False
    )

    class Meta:
        model = Set
        fields = ["creator", "description", "name", "picture", "terms_batch", "terms"]

    def create(self, data):
        term_batch_ids = []
        term_ids = []
        if "terms_batch" in data:
            terms_batch = data.pop("terms_batch")

            term_list = terms_batch.split(";")
            for term in term_list:
                if term:
                    term_split = term.split(":")
                    term_front = term_split[2]
                    term_back_alternatives = term_split[1]
                    term_back = term_split[0]
                    created_term = Term.objects.create(
                        front=term_front,
                        back=term_back,
                        back_alternatives=term_back_alternatives,
                    )
                    term_batch_ids.append(created_term.id)

        if "terms" in data:
            term_ids = data.pop("terms")

        terms_full_list = term_ids + term_batch_ids
        created_set = Set.objects.create(**data)
        created_set.terms.set(terms_full_list)
        return created_set

class SetUpdateSerializer(SetSerializer):
    terms = serializers.SlugRelatedField(
        many=True, slug_field="id", queryset=Term.objects.all()
    )

    def to_representation(self, instance):
        if self.context["request"].method == "PUT":
            serializer = SetSerializer(instance)
            return serializer.data
        return super().to_representation(instance)
