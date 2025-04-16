from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaisViewSet, EstadoViewSet, CidadeViewSet, CondicaoPgViewSet

router = DefaultRouter()
router.register(r'pais', PaisViewSet)
router.register(r'estados', EstadoViewSet)
router.register(r'cidades', CidadeViewSet)
router.register(r'condpg', CondicaoPgViewSet)

urlpatterns = [path('', include(router.urls))]
