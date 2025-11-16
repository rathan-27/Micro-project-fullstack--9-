from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, ReviewViewSet
from . import auth_urls

router = DefaultRouter()
router.register("movies", MovieViewSet, basename="movies")
router.register("reviews", ReviewViewSet, basename="reviews")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include(auth_urls)),
]
