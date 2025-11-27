from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import UserProfileSerializer
from .models import UserProfile


# -------------------------------
# REGISTER
# -------------------------------
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

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        # Create user profile automatically
        UserProfile.objects.get_or_create(user=user)

        return Response({"message": "User created successfully"}, status=201)


# -------------------------------
# LOGIN
# -------------------------------
class LoginView(APIView):
    http_method_names = ["post", "options"]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"}, status=400)

        user = User.objects.filter(username=username).first()

        if not user or not user.check_password(password):
            return Response({"error": "Invalid username or password"}, status=400)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
        })


# -------------------------------
# PROFILE VIEW + UPDATE
# -------------------------------
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
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

        # UPDATE FIELDS
        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.set_password(password)

        user.save()

        # if password changed → send new JWT tokens
        if password:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Profile updated successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })

        return Response({"message": "Profile updated successfully"})


# -------------------------------
# UPLOAD PROFILE PICTURE (FIXED🔥)
# -------------------------------
class UploadProfilePicView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = request.user

        file = request.FILES.get("profile_pic")
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        # SAFE: Works for new & old users
        profile, created = UserProfile.objects.get_or_create(user=user)

        profile.profile_pic = file
        profile.save()

        return Response({
            "message": "Uploaded successfully!",
            "profile_pic": profile.profile_pic.url
        })
