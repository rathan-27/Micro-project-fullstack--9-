# movies/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.movie_list),
    path("<int:pk>/", views.movie_detail),
    path("reviews/", views.review_create),
    path("reviews/<int:pk>/react/", views.review_react),

    # AUTH ROUTES HERE
    path("auth/", include("movies.auth_urls")),
]
