from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate

@api_view(['POST'])
def api_login(request):
    # Debug: imprimir os dados recebidos
    print("Dados recebidos:", request.data)
    
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        print("Usuário autenticado:", user.username)  # Debug
        return Response({"token": token.key}, status=200)
    
    print("Autenticação falhou para:", username)  # Debug
    return Response({"error": "Usuário ou senha inválidos."}, status=400)
