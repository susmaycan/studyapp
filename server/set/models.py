from djongo import models

from term.models import Term
from user.models import User


class Set(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100, blank=True, null=True)
    picture = models.CharField(max_length=300, blank=True, null=True)
    terms = models.ManyToManyField(Term, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True, null=True
    )
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
