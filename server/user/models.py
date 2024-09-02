from django.contrib.auth.models import AbstractUser
from djongo import models


class User(AbstractUser):
    _id = models.ObjectIdField()

    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
