from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PaisViewSet, EstadoViewSet, CidadeViewSet, CondicaoPgViewSet, ClienteViewSet,UserViewSet, 
    FornecedorViewSet, CargoViewSet, api_login  # Certifique-se de que api_login está importado!
)

# Registrar ViewSets
router = DefaultRouter()
router.register(r'pais', PaisViewSet)
router.register(r'estados', EstadoViewSet)
router.register(r'cidades', CidadeViewSet)
router.register(r'condpg', CondicaoPgViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'fornecedores', FornecedorViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'usuarios', UserViewSet) 

# Definir rotas
urlpatterns = [
    path('', include(router.urls)),  # Rotas automáticas dos ViewSets
    path('login/', api_login, name='api-login'),  # Endpoint de login
]
