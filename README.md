Movie Review System - 9

TEAM MEMBERS -
RATHAN KV(4MC23IS087)
SANDESH DR(4MC23IS094)
TEJASWI KG(4MC23IS116)
VINAY NL(4MC23IS125)
SHREYAS CS(4MC23IS101)

A full-stack web application where users can browse movies, view details, and post reviews.
Users must log in to interact with the app, and JWT authentication is used for secure access.

Features

User Registration & Login (JWT Auth)

Browse list of movies

View movie details & genres

Add movie reviews with star ratings

Like/Dislike reviews

User profile section

Protected Routes (Only logged-in users can access movie pages)

Tech Stack
Area	Technology
Frontend	React + Bootstrap
Backend	Django + Django REST Framework
Auth	JWT (SimpleJWT)
Database	SQLite

Setup Instructions
1️⃣ Backend (Django)
cd Movie-review
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend will run on:

http://127.0.0.1:8000/

2️⃣ Frontend (React)
cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5174/

Project Structure
Movie-review/
│ manage.py
│ README.md
│ requirements.txt
│ db.sqlite3
│
├── movies/        # Django backend app
│
├── frontend/      # React frontend

Usage

Open browser → http://localhost:5174/

Register/Login

Browse movies & open details

Post reviews and react to others

License

This project is for educational and personal development use.