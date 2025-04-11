from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import api_login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('local.urls')),  # Certifique-se de que está incluindo as URLs da aplicação
    path('login/', api_login, name='api-login'),  # Endereço para API de login personalizada
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    
]
