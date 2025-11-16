from movies.models import Movie, Genre

MOVIES = [
    {
        "title": "KGF Chapter 2",
        "year": 2022,
        "description": "Rocky continues his domination as he confronts threats from all sides.",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDM0NDAzMzMtOTYxYi00ZDk3LTk0MGEtZGE0YzFlYTg4Yzc1XkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action", "Drama"]
    },
    {
        "title": "Leo",
        "year": 2023,
        "description": "A man with a violent past struggles to hide his true identity.",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTljZmUzYjktNDAyZi00NDNmLWJhZWUtNTE4YmJhOWNlOGZlXkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action", "Thriller"]
    },
    {
        "title": "Jawan",
        "year": 2023,
        "description": "A soldier sets out to fix corruption in society in his own style.",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDU3YmNjMzItZGM5OC00YzYxLWI1MTMtOWQ1NzE2NzliNjNjXkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action"]
    },
    {
        "title": "Pushpa: The Rise",
        "year": 2021,
        "description": "A laborer rises to power in a red sandalwood smuggling syndicate.",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzQ2MmY5OWYtZjYyMi00NjdlLWExNWQtYmI4MWUxOTE1YzcxXkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action", "Crime"]
    },
    {
        "title": "Kantara",
        "year": 2022,
        "description": "A divine folklore spectacle set in a rural village.",
        "poster": "https://m.media-amazon.com/images/M/MV5BZmQ3YzViMzAtM2RkNy00YzY5LTgyYmUtNmRmYjg3ZWU5MmYxXkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action", "Adventure"]
    },
    {
        "title": "RRR",
        "year": 2022,
        "description": "Two legendary revolutionaries fight for India's freedom.",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTBlMmVkYTgtYzgyOS00ZTFmLTkxM2MtZjhlNzlkYzRiYjI0XkEyXkFqcGc@._V1_.jpg",
        "genres": ["Action", "Drama"]
    },
    {
        "title": "Inception",
        "year": 2010,
        "description": "A thief enters dreams to steal secrets and plant ideas.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmZmNmFmNzUtMTU5Yi00NDQyLTlkMDItYTcyOTg1ZDdmZTIyXkEyXkFqcGc@._V1_.jpg",
        "genres": ["Sci-Fi", "Thriller"]
    }
]

def run():
    for m in MOVIES:
        movie, created = Movie.objects.get_or_create(
            title=m["title"],
            defaults={
                "description": m["description"],
                "poster_url": m["poster"],
                "release_year": m["year"]
            }
        )

        if not created:
            movie.description = m["description"]
            movie.poster_url = m["poster"]
            movie.release_year = m["year"]
            movie.save()

        # Add genres
        movie.genres.clear()
        for gname in m["genres"]:
            genre, _ = Genre.objects.get_or_create(name=gname)
            movie.genres.add(genre)

        print(f"✔ Updated {movie.title}")

    print("\n🎉 All movies updated successfully!")
