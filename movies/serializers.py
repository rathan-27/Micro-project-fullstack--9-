from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Avg

from .models import Movie, Genre, Review


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name"]

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ["id", "user", "text", "rating", "likes", "dislikes", "created_at"]

    def get_likes(self, obj):
        return obj.reactions.filter(value=1).count()

    def get_dislikes(self, obj):
        return obj.reactions.filter(value=-1).count()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "description",
            "poster_url",
            "release_year",
            "genres",
            "avg_rating",
            "reviews",
        ]

    def get_avg_rating(self, obj):
        avg = obj.reviews.aggregate(val=Avg("rating"))["val"]
        return round(avg or 0, 1)


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["movie", "text", "rating"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
