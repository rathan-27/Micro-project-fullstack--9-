from django.contrib import admin
from .models import Movie, Genre, Review, ReviewReaction

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "release_year")
    search_fields = ("title",)
    list_filter = ("release_year",)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "movie", "user", "rating", "created_at")
    search_fields = ("movie__title", "user__username")

admin.site.register(Genre)
admin.site.register(ReviewReaction)
