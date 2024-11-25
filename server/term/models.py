from djongo import models

from user.models import User


class Term(models.Model):
    front = models.CharField(max_length=50)
    back = models.CharField(max_length=50)
    back_alternatives = models.CharField(null=True, blank=True, max_length=200)
    description = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True, null=True
    )
    creator = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return self.front

    def __unicode__(self):
        return self.front
