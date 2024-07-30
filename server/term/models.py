from django.db import models


class Term(models.Model):
    front = models.CharField(max_length=50)
    back = models.CharField(max_length=50)
    description = models.CharField(max_length=100, blank=True, null=True)
    progress = models.IntegerField(max_length=100, default=0)

    def __str__(self):
        return self.front

    def __unicode__(self):
        return self.front
