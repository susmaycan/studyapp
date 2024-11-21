from djongo import models


class Term(models.Model):
    front = models.CharField(max_length=50)
    back = models.CharField(max_length=50)
    back_alternatives = models.CharField(null=True, blank=True, max_length=200)
    description = models.CharField(max_length=100, blank=True, null=True)
    progress = models.IntegerField(default=0)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True, null=True
    )

    def __str__(self):
        return self.front

    def __unicode__(self):
        return self.front
