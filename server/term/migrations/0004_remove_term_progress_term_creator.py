# Generated by Django 4.1.13 on 2024-11-22 12:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("term", "0003_term_created_at"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="term",
            name="progress",
        ),
        migrations.AddField(
            model_name="term",
            name="creator",
            field=models.ForeignKey(
                default="66d5af4c39d7d74f5be72f30",
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
