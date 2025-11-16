from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Avg
from .models import Movie, Genre, Review, ReviewReaction


# --------------------
# BASIC USER SERIALIZER
# --------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


# --------------------
# REGISTER SERIALIZER
# --------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )


# --------------------
# GENRE SERIALIZER
# --------------------
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name"]


# --------------------
# REVIEW SERIALIZER
# --------------------
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    reactions = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "movie",
            "user",
            "rating",
            "text",
            "created_at",
            "reactions"
        ]

    def get_reactions(self, obj):
        return [{"user": r.user.id, "value": r.value} for r in obj.reactions.all()]



# --------------------
# MOVIE SERIALIZER
# --------------------
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
        return obj.reviews.aggregate(Avg("rating"))["rating__avg"]


# --------------------
# REVIEWED MOVIE SERIALIZER (used in profile)
# --------------------
class ReviewedMovieSerializer(serializers.ModelSerializer):
    user_rating = serializers.SerializerMethodField()
    review_id = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ["id", "title", "poster_url", "release_year", "user_rating", "review_id"]

    def get_user_rating(self, obj):
        user = self.context.get("user")
        review = Review.objects.filter(movie=obj, user=user).first()
        return review.rating if review else None

    def get_review_id(self, obj):
        user = self.context.get("user")
        review = Review.objects.filter(movie=obj, user=user).first()
        return review.id if review else None


# --------------------
# FULL USER PROFILE SERIALIZER
# --------------------
class UserProfileSerializer(serializers.ModelSerializer):
    joined = serializers.DateTimeField(source="date_joined", format="%Y-%m-%d", read_only=True)
    reviews_count = serializers.SerializerMethodField()
    avg_rating_given = serializers.SerializerMethodField()
    reviewed_movies = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "joined",
            "reviews_count",
            "avg_rating_given",
            "reviewed_movies",
        ]

    def get_reviews_count(self, user):
        return user.reviews.count()

    def get_avg_rating_given(self, user):
        avg = user.reviews.aggregate(avg=Avg("rating"))["avg"]
        return round(avg or 0, 2)

    def get_reviewed_movies(self, user):
        movies = Movie.objects.filter(reviews__user=user).distinct()
        return ReviewedMovieSerializer(
            movies,
            many=True,
            context={"user": user}
        ).data
