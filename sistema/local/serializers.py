from rest_framework import serializers
from .models import Pais, Estado, Cidade, CondicaoPagamento

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
