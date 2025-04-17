from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('local.urls')),  # Todas as rotas agora são gerenciadas por `local`
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
