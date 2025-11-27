from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('movies.urls')),
]

# Serve React static asset files (JS, CSS)
if settings.DEBUG:
    urlpatterns += static(
        '/assets/',  # 👈 URL prefix
        document_root=settings.BASE_DIR / 'dist' / 'assets'  # 👈 Actual folder
    )

# Serve React frontend index.html for all other routes
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
