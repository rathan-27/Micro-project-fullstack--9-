import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from movies.models import Movie, Genre

movies_data = [
    {
        "title": "KGF Chapter 2",
        "description": "Rocky continues his rule as the kingpin of Kolar Gold Fields.",
        "poster_url": "https://image.tmdb.org/t/p/w500/7q448EVOnuE3gVAx24krzO7SNXM.jpg",
        "release_year": 2022,
        "genres": ["Action", "Drama"]
    },
    {
        "title": "Leo",
        "description": "A mild-mannered cafe owner becomes entangled in a violent world.",
        "poster_url": "https://image.tmdb.org/t/p/w500/kp7xO3T8SgaXedUsYNVJrqarQ7m.jpg",
        "release_year": 2023,
        "genres": ["Action", "Thriller"]
    },
    {
        "title": "Jawan",
        "description": "A man commits to rectifying societal injustice with the help of women.",
        "poster_url": "https://image.tmdb.org/t/p/w500/b5VnvpGDXpkYIpgwV1vLBqHVjzf.jpg",
        "release_year": 2023,
        "genres": ["Action"]
    },
    {
        "title": "Pushpa: The Rise",
        "description": "A labourer rises to power in the red sandalwood smuggling world.",
        "poster_url": "https://image.tmdb.org/t/p/w500/6SnbmoYjLMXHbOxGKF4t0HzDqQf.jpg",
        "release_year": 2021,
        "genres": ["Action", "Drama"]
    },
    {
        "title": "Vikram",
        "description": "A special agent hunts a group of masked murderers.",
        "poster_url": "https://image.tmdb.org/t/p/w500/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        "release_year": 2022,
        "genres": ["Action", "Thriller"]
    },
    {
        "title": "Kantara",
        "description": "Villagers fight to protect their land with divine spirit power.",
        "poster_url": "https://image.tmdb.org/t/p/w500/qUOJGvH8LJeIoTNZJcPpNZFym7J.jpg",
        "release_year": 2022,
        "genres": ["Drama", "Mystery"]
    },
    {
        "title": "RRR",
        "description": "Two revolutionaries fight against British rule.",
        "poster_url": "https://image.tmdb.org/t/p/w500/nCwOmOiRZfn2D6l8K9h5Gbi6fTP.jpg",
        "release_year": 2022,
        "genres": ["Action", "Adventure"]
    },
    {
        "title": "Inception",
        "description": "A thief steals corporate secrets through dreams.",
        "poster_url": "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        "release_year": 2010,
        "genres": ["Sci-Fi", "Thriller"]
    },
    {
        "title": "Interstellar",
        "description": "A group travels through a wormhole to find a new planet.",
        "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "release_year": 2014,
        "genres": ["Sci-Fi", "Adventure"]
    },
    {
        "title": "Avengers: Endgame",
        "description": "The Avengers regroup for one final fight to save the universe.",
        "poster_url": "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
        "release_year": 2019,
        "genres": ["Action", "Adventure"]
    },
]

print("📽 Adding movies...")

for m in movies_data:
    genre_objs = []

    for g in m["genres"]:
        genre_obj, created = Genre.objects.get_or_create(name=g)
        genre_objs.append(genre_obj)

    movie, created = Movie.objects.get_or_create(
        title=m["title"],
        defaults={
            "description": m["description"],
            "poster_url": m["poster_url"],
            "release_year": m["release_year"]
        }
    )

    movie.genres.set(genre_objs)
    movie.save()

print("✅ Movies added successfully!")
