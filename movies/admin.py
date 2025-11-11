from django.contrib import admin
from .models import Genre, Movie, Review, ReviewReaction

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ("title", "release_year", "display_genres", "avg_rating")
    search_fields = ("title", "description")
    list_filter = ("release_year", "genres")
    filter_horizontal = ("genres",)

    def display_genres(self, obj):
        return ", ".join([g.name for g in obj.genres.all()])
    display_genres.short_description = "Genres"

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("movie", "user", "rating", "is_approved", "created_at")
    list_filter = ("rating", "is_approved", "created_at")
    search_fields = ("movie__title", "user__username", "text")
    list_editable = ("is_approved",)  # ✅ Now admin can approve directly here

@admin.register(ReviewReaction)
class ReviewReactionAdmin(admin.ModelAdmin):
    list_display = ("review", "user", "value")
    list_filter = ("value",)
