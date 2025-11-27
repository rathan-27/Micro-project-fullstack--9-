🎬 Movie Review System

A full-stack Movie Review Platform built using Django REST Framework (Backend) and React (Frontend).
Users can browse movies, post reviews, rate movies, and manage their own accounts.
Admins can manage movies, users, and moderate reviews via Django Admin Panel.

🚀 Features
🎯 User Features

🔍 Browse all movies

⭐ Add movie reviews and ratings

✏️ Edit or delete own reviews

👤 Register & login with JWT authentication

🔐 Only logged-in users can post reviews

🛠 Admin Features

🎞 Add, edit, or delete movies

🧾 Edit or remove offensive reviews

👥 Manage users in Django Admin

🎛 Assign user roles (admin/user)

🏗 Tech Stack
Layer	Technology
Frontend	React (Vite), Axios, React Router
Backend	Django, Django REST Framework
Authentication	JWT (Simple JWT)
Database	SQLite (development), PostgreSQL (optional)
Styling	Tailwind / Bootstrap / Custom CSS
Deployment	Django-hosted frontend (React build inside dist/)
📁 Project Structure
MovieReviewSystem/
│── manage.py
│── server/                 # Django project (settings, urls, wsgi)
│── movies/                 # Backend app (models, views, serializers)
│── dist/                   # React production build served by Django
│   ├── index.html
│   ├── assets/
│── staticfiles/            # Django collected statics
│── media/                  # Uploaded images (movie posters)
│── requirements.txt
│── README.md
│── .gitignore

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/movies/	List all movies
GET	/api/movies/<id>/	Movie details + reviews
POST	/api/movies/	Add new movie (Admin only)
POST	/api/reviews/	Add review (Auth users)
PUT	/api/reviews/<id>/	Update own review
DELETE	/api/reviews/<id>/	Delete own review
POST	/api/auth/login/	User login (JWT)
POST	/api/auth/register/	User registration
POST	/api/auth/refresh/	Refresh token
⚙ Installation Guide
📌 Backend Setup (Django)
git clone <your-repo-url>
cd MovieReviewSystem
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser

📌 Frontend Setup (React - only for development)
cd frontend
npm install
npm run dev


👉 To build for production and integrate with Django:

npm run build


Then move the dist/ folder into your Django project root.

▶ Run Full Application (Single Port)
python manage.py runserver

URL	Description
http://127.0.0.1:8000/	React frontend
http://127.0.0.1:8000/api/movies/	API
http://127.0.0.1:8000/admin/	Admin
🌐 Deployment Ready

Since frontend is served through Django (from dist/),
deployment is easy on:

Platform	Status
Render	✅ Recommended
Railway	✅ Supported
PythonAnywhere	⚠ No React support
AWS EC2	✔ Production ready
DigitalOcean	✔ Production ready
✨ Future Enhancements

✔ Add user profiles
✔ Upload movie posters
✔ Like/upvote reviews
✔ Pagination & filtering
✔ Social login (Google/GitHub)

🧑‍💻 Author & Credits

Developed as a full-stack Movie Review System using Django & React.

💡 Need help with deployment, database switching, or adding new features?
👉 Feel free to ask me anytime!
