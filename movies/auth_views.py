from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserProfileSerializer  # ⭐ REQUIRED


# REGISTER USER
class RegisterView(APIView):
    http_method_names = ["post", "options"]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        return Response({"message": "User created successfully"}, status=201)


# LOGIN USER
class LoginView(APIView):
    http_method_names = ["post", "options"]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"}, status=400)

        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            return Response({"error": "Invalid username or password"}, status=400)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username
        })


# PROFILE VIEW
# PROFILE VIEW (FULLY FIXED)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .serializers import UserProfileSerializer
        return Response(UserProfileSerializer(request.user).data)

    def put(self, request):
        user = request.user
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # VALIDATION
        if username and User.objects.exclude(id=user.id).filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        if email and User.objects.exclude(id=user.id).filter(email=email).exists():
            return Response({"error": "Email already taken"}, status=400)

        # UPDATE
        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.set_password(password)

        user.save()

        # SEND NEW TOKEN IF PASSWORD CHANGED
        if password:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Profile updated successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })

        return Response({"message": "Profile updated successfully"})
