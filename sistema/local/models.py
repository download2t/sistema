from django.db import models

class Pais(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitamente definindo o campo id
    nome = models.CharField(max_length=100, unique=True)
    sigla = models.CharField(max_length=3)
    DDI = models.CharField(max_length=3)
    status_pais = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

class Estado(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitamente definindo o campo id
    nome = models.CharField(max_length=100, unique=True)
    uf = models.CharField(max_length=2)
    id_pais = models.ForeignKey(Pais, on_delete=models.CASCADE)
    status_estado = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

class Cidade(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitamente definindo o campo id
    nome = models.CharField(max_length=100, unique=True)
    DDD = models.CharField(max_length=3)
    id_estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    status_cidade = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)
