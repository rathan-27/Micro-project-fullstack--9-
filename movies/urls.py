from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MovieViewSet, ReviewViewSet
from .auth_views import RegisterView, LoginView, ProfileView

router = DefaultRouter()
router.register("movies", MovieViewSet)
router.register("reviews", ReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),

    # AUTH API
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("auth/profile/", ProfileView.as_view()),
]
