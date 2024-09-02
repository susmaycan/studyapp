from djongo import models

from term.models import Term


class Set(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100, blank=True, null=True)
    picture = models.CharField(max_length=300, blank=True, null=True)
    terms = models.ManyToManyField(Term, blank=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
