from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RegisterView, MovieViewSet, ReviewViewSet, ProfileView, ProfileUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register("movies", MovieViewSet, basename="movies")
router.register("reviews", ReviewViewSet, basename="reviews")

urlpatterns = [
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("auth/profile/", ProfileView.as_view()),
    path("", include(router.urls)),
    path("auth/profile/update/", ProfileUpdateView.as_view()),

]
