# Generated by Django 4.1.13 on 2024-11-22 13:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("set", "0003_set_creator"),
    ]

    operations = [
        migrations.AlterField(
            model_name="set",
            name="creator",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
