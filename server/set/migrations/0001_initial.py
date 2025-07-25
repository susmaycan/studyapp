# Generated by Django 4.1.13 on 2024-09-02 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("term", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Set",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                (
                    "description",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("picture", models.CharField(blank=True, max_length=300, null=True)),
                ("terms", models.ManyToManyField(blank=True, to="term.term")),
            ],
        ),
    ]
