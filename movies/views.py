from django.contrib.auth.models import User
from django.db.models import Avg, Q
from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Movie, Review, ReviewReaction
from .serializers import (
    MovieSerializer,
    ReviewSerializer,
    UserSerializer
)

# -----------------------
# PROFILE VIEW
# -----------------------
class ProfileView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# -----------------------
# MOVIES VIEWSET
# -----------------------
class MovieViewSet(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]
    queryset = Movie.objects.all()

    def get_queryset(self):
        qs = Movie.objects.all()

        q = self.request.query_params.get("q")
        genre = self.request.query_params.get("genre")

        if q:
            qs = qs.filter(
                Q(title__icontains=q) |
                Q(description__icontains=q)
            )

        if genre:
            qs = qs.filter(genres__name__iexact=genre)

        return qs


# -----------------------
# REVIEWS VIEWSET
# -----------------------
# -----------------------
# REVIEWS VIEWSET
# -----------------------
# -----------------------
# REVIEWS VIEWSET
# -----------------------
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    # Permissions
    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy", "react"]:
            return [IsAuthenticated()]
        return [AllowAny()]

    # Save review owner
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # ⭐ NEW REACT FUNCTION (toggle like/dislike)
    @action(detail=True, methods=["post"])
    def react(self, request, pk=None):
        review = self.get_object()
        try:
            value = int(request.data.get("value"))
        except:
            return Response({"error": "Invalid value"}, status=400)

        if value not in [1, -1]:
            return Response({"error": "Invalid reaction"}, status=400)

        user = request.user
        existing = ReviewReaction.objects.filter(review=review, user=user).first()

        # Case 1: same reaction → remove it
        if existing and existing.value == value:
            existing.delete()
            return Response({"status": "removed"})

        # Case 2: switch or new
        ReviewReaction.objects.update_or_create(
            review=review,
            user=user,
            defaults={"value": value}
        )

        return Response({"status": "updated"})

