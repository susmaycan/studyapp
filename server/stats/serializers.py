from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from term.models import Term
from term.serializers import TermSerializer
from user.serializers import UserSerializer

from .models import Stats


class StatsSerializer(serializers.ModelSerializer):
    term = TermSerializer()
    user = UserSerializer()

    class Meta:
        model = Stats
        fields = ("id", "total", "ok", "ko", "user", "term")
        read_only_fields = ("id", "total", "ok", "ko", "user", "term")


# class StatsTermSerializer(serializers.Serializer):
#     term = serializers.CharField()
#     ok = serializers.IntegerField()
#     ko = serializers.IntegerField()


class StatsCreateSerializer(serializers.Serializer):
    terms = serializers.SerializerMethodField()
    # term_list = serializers.ListField(child=StatsTermSerializer)

    def get_terms(self, obj):
        print("Stats!!")
        print(obj)
        return "Foo id: %i" % obj

    def create(self, data):
        print(data)
