from django.urls import path
from .auth_views import RegisterView, LoginView, ProfileView, UploadProfilePicView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("upload_pic/", UploadProfilePicView.as_view()),  # <<-- VERY IMPORTANT
]
