from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self): return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    poster_url = models.URLField(blank=True)
    release_year = models.PositiveIntegerField()
    genres = models.ManyToManyField(Genre, related_name="movies", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.title

class Review(models.Model):
    movie = models.ForeignKey(Movie, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="reviews", on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("movie", "user")

class ReviewReaction(models.Model):
    review = models.ForeignKey(Review, related_name="reactions", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="review_reactions", on_delete=models.CASCADE)
    value = models.SmallIntegerField(choices=[(-1, "dislike"), (1, "like")])

    class Meta:
        unique_together = ("review", "user")
        
poster_url = models.URLField(blank=True, null=True)
