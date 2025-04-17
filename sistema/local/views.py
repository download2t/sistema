from rest_framework import viewsets
from .models import Pais, Estado, Cidade,CondicaoPagamento, Cliente, Fornecedor, Cargo
from .serializers import PaisSerializer, EstadoSerializer, CidadeSerializer,CondicaoPagamentoSerializer, ClienteSerializer, FornecedorSerializer, CargoSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

@api_view(['POST'])
def api_login(request):
    """ Autentica o usuário e retorna um token """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=200)
    
    return Response({"error": "Usuário ou senha inválidos."}, status=400)

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
    queryset = CondicaoPagamento.objects.all()  
    serializer_class = CondicaoPagamentoSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.select_related('id_cidade', 'id_condicao_pagamento') 
    serializer_class = ClienteSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.select_related('id_cidade', 'id_condicao_pagamento')  # Otimiza consultas
    serializer_class = FornecedorSerializer  

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer

class UserViewSet(viewsets.ModelViewSet):  
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

