from django.contrib import admin

from user.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "username",
        "email",
    )
    list_display_links = (
        "pk",
        "username",
        "email",
    )

    search_fields = (
        "email",
        "username",
        "first_name",
        "last_name",
    )

    list_filter = (
        "is_active",
        "is_staff",
        "date_joined",
    )

    readonly_fields = ("date_joined",)
