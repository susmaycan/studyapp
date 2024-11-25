from djongo import models

from term.models import Term
from user.models import User


class Stats(models.Model):
    total = models.IntegerField(default=0)
    ok = models.IntegerField(default=0)
    ko = models.IntegerField(default=0)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True, null=True
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
