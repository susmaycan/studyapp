from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from term.models import Term
from term.serializers import TermSerializer

from .models import Set


class SetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    terms = TermSerializer(many=True)

    class Meta:
        model = Set
        fields = ("id", "name", "description", "terms", "picture")
        read_only_fields = ("id", "name", "description", "terms", "picture")


class SetCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=100, required=False)
    picture = serializers.CharField(max_length=300, required=False)
    terms = serializers.CharField(max_length=2000)

    class Meta:
        model = Set
        fields = [
            "name",
            "description",
            "picture",
            "terms",
        ]

    def create(self, data):
        print("**************************")
        terms = data.pop("terms")
        print("🚀 ~ terms:", terms)

        term_list = terms.split(";")
        print("🚀 ~ term_list:", term_list)
        term_ids = []
        for term in term_list:
            if term:
                term_split = term.split(",")
                term_front = term_split[1]
                term_back = term_split[0]
                created_term = Term.objects.create(front=term_front, back=term_back)
                term_ids.append(created_term.id)

        print(term_ids)
        created_set = Set.objects.create(**data)
        created_set.terms.set(term_ids)
        print("**************************")
        return created_set
