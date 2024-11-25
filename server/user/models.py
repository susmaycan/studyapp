from django.contrib.auth.models import AbstractUser
from djongo import models


class User(AbstractUser):
    _id = models.ObjectIdField()

    email = models.EmailField(unique=True)
    is_staff = models.BooleanField("staff status", default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return str(self._id)

    def __unicode__(self):
        return str(self._id)
