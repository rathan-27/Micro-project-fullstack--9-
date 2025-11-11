from django.db.models import Avg, Q
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import Movie, Review, ReviewReaction
from .serializers import (
    RegisterSerializer, UserSerializer,
    MovieSerializer, ReviewSerializer
)
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = Movie.objects.all().annotate(avg_rating=Avg("reviews__rating"))
        q = self.request.query_params.get("q")
        genre = self.request.query_params.get("genre")

        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(description__icontains=q))
        if genre:
            qs = qs.filter(genres__name__iexact=genre)

        return qs


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        user.username = request.data.get("username", user.username)
        user.email = request.data.get("email", user.email)

        if request.data.get("password"):
            user.set_password(request.data.get("password"))

        user.save()
        return Response({"status": "updated"})


from rest_framework import status

class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        if "username" in data:
            user.username = data["username"]

        if "email" in data:
            user.email = data["email"]

        if "password" in data and data["password"].strip():
            user.set_password(data["password"])

        user.save()
        return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)



class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated & IsOwnerOrReadOnly]

    def get_queryset(self):
        return Review.objects.select_related("user", "movie")

    def perform_create(self, serializer):
        movie_id = self.request.data.get("movie")
        serializer.save(user=self.request.user, movie_id=movie_id)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        ReviewReaction.objects.update_or_create(
            review=self.get_object(), user=request.user, defaults={"value": 1}
        )
        return Response({"status": "liked"})

    @action(detail=True, methods=["post"])
    def dislike(self, request, pk=None):
        ReviewReaction.objects.update_or_create(
            review=self.get_object(), user=request.user, defaults={"value": -1}
        )
        return Response({"status": "disliked"})

    @action(detail=True, methods=["post"])
    def clear_reaction(self, request, pk=None):
        ReviewReaction.objects.filter(review=self.get_object(), user=request.user).delete()
        return Response({"status": "cleared"})
