from rest_framework import serializers,viewsets
from .models import Pais, Estado, Cidade, CondicaoPagamento, Cliente, Fornecedor, Cargo, User
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    pais_nome = serializers.CharField(source='id_pais.nome', read_only=True)  # Inclui o nome do país relacionado

    class Meta:
        model = Estado
        fields = ['id', 'nome', 'uf', 'status_estado', 'id_pais', 'pais_nome']  # Inclua 'pais_nome'

class CidadeSerializer(serializers.ModelSerializer):
    estado_nome = serializers.CharField(source='id_estado.nome', read_only=True)  # Inclui o nome do estado relacionado

    class Meta:
        model = Cidade
        fields = ['id', 'nome', 'DDD', 'status_cidade', 'id_estado', 'estado_nome']  # Inclua 'estado_nome'


class CondicaoPagamentoSerializer(serializers.ModelSerializer):
    condicao_formatada = serializers.SerializerMethodField()

    class Meta:
        model = CondicaoPagamento
        fields = ['id_condicao', 'condicao', 'parcelas', 'taxa', 'multa', 'desconto', 'status_condicao', 'data_criacao', 'data_ult_alteracao', 'condicao_formatada']  # Correção aqui

    def get_condicao_formatada(self, obj):
        return f"{obj.condicao} - {obj.parcelas} parcelas, taxa: {obj.taxa}%"


class ClienteSerializer(serializers.ModelSerializer):
    cidade_nome = serializers.CharField(source='id_cidade.nome', read_only=True)  # Nome da cidade relacionada
    condicao_pagamento_nome = serializers.CharField(source='id_condicao_pagamento.condicao', read_only=True)  # Nome da condição de pagamento relacionada

    class Meta:
        model = Cliente
        fields = [
            'id_cliente', 'status_cliente', 'nome', 'sexo', 'apelido', 'rg', 'cpf', 'cnpj',
            'email', 'telefone', 'celular', 'cep', 'endereco', 'numero', 'complemento', 'bairro',
            'id_cidade', 'cidade_nome', 'id_condicao_pagamento', 'condicao_pagamento_nome',
            'data_nasc', 'data_criacao', 'tipo_cliente', 'data_ult_alteracao'
        ]


class FornecedorSerializer(serializers.ModelSerializer):
    cidade_nome = serializers.CharField(source='id_cidade.nome', read_only=True)  # Nome da cidade relacionada
    condicao_pagamento_nome = serializers.CharField(source='id_condicao_pagamento.condicao', read_only=True)  # Nome da condição de pagamento

    class Meta:
        model = Fornecedor
        fields = [
            'id_fornecedor', 'status_fornecedor', 'nome_fantasia', 'razao_social', 'data_fundacao',
            'insc_municipal', 'insc_estadual', 'cpf', 'rg', 'cnpj', 'email', 'telefone', 'celular',
            'cep', 'endereco', 'numero', 'complemento', 'bairro', 'tipo_fornecedor',
            'id_cidade', 'cidade_nome', 'id_condicao_pagamento', 'condicao_pagamento_nome',
            'data_criacao', 'data_ult_alteracao'
        ]

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'is_staff', 'is_superuser', 'is_active', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def create(self, validated_data):
        """Cria um usuário com todos os campos e criptografa a senha"""
        password = validated_data.pop('password', None)
        user = get_user_model().objects.create(**validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

    def update(self, instance, validated_data):
        """Atualiza um usuário sem sobrescrever a senha se ela não for fornecida"""
        password = validated_data.pop('password', None)

        if password:  # Apenas altera a senha se o usuário preencher o campo
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
