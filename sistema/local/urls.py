from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaisViewSet, EstadoViewSet, CidadeViewSet

router = DefaultRouter()
router.register(r'pais', PaisViewSet)
router.register(r'estados', EstadoViewSet)
router.register(r'cidades', CidadeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
