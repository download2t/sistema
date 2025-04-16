from rest_framework import viewsets
from .models import Pais, Estado, Cidade,CondicaoPagamento
from .serializers import PaisSerializer, EstadoSerializer, CidadeSerializer,CondicaoPagamentoSerializer

class PaisViewSet(viewsets.ModelViewSet):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.select_related('id_pais') 
    serializer_class = EstadoSerializer

class CidadeViewSet(viewsets.ModelViewSet):
    queryset = Cidade.objects.select_related('id_estado')  
    serializer_class = CidadeSerializer

class CondicaoPgViewSet(viewsets.ModelViewSet):
    queryset = CondicaoPagamento.objects.all()  # Correção aqui
    serializer_class = CondicaoPagamentoSerializer

    
