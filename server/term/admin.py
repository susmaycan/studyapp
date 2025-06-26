from django.contrib import admin

from .models import Term, TermSegment

# Register your models here.
admin.site.register(Term)
admin.site.register(TermSegment)
