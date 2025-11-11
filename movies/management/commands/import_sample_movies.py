from django.core.management.base import BaseCommand
from movies.models import Movie, Genre

SAMPLE_MOVIES = [
    {
        "title": "Interstellar",
        "description": "A team travels through a wormhole in space in an attempt to ensure humanity’s survival.",
        "release_year": 2014,
        "poster_url": "https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg",
        "genres": ["Sci-Fi", "Adventure"]
    },
    {
        "title": "Inception",
        "description": "A thief who steals corporate secrets through dreams is given the inverse task of planting an idea.",
        "release_year": 2010,
        "poster_url": "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        "genres": ["Sci-Fi", "Thriller"]
    },
    {
        "title": "The Dark Knight",
        "description": "Batman faces the Joker, a criminal mastermind who causes chaos in Gotham.",
        "release_year": 2008,
        "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "genres": ["Action", "Crime"]
    },
    {
        "title": "Avatar",
        "description": "A paraplegic marine dispatched to the moon Pandora joins the indigenous Na'vi race.",
        "release_year": 2009,
        "poster_url": "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkBbZwC3TGHv.jpg",
        "genres": ["Sci-Fi", "Adventure"]
    },
    {
        "title": "Titanic",
        "description": "A romance aboard the doomed RMS Titanic.",
        "release_year": 1997,
        "poster_url": "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        "genres": ["Drama", "Romance"]
    }
]

class Command(BaseCommand):
    help = "Import sample movies without API"

    def handle(self, *args, **kwargs):
        for data in SAMPLE_MOVIES:
            movie, created = Movie.objects.get_or_create(
                title=data["title"],
                defaults={
                    "description": data["description"],
                    "poster_url": data["poster_url"],
                    "release_year": data["release_year"]
                }
            )

            for g in data["genres"]:
                genre, _ = Genre.objects.get_or_create(name=g)
                movie.genres.add(genre)

            self.stdout.write(self.style.SUCCESS(f"Imported: {movie.title}"))
