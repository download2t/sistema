from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from .validators import validate_ddi, validate_sigla, validate_uf, validate_ddd, validate_status, validate_cpf, validate_cnpj  # Importação dos validadores

class Pais(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, unique=True)
    sigla = models.CharField(max_length=3, validators=[validate_sigla])  # Validação adicionada
    DDI = models.CharField(max_length=2, validators=[validate_ddi])  # Validação adicionada
    status_pais = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        if Estado.objects.filter(id_pais=self.id).exists():
            raise ValidationError("Não é possível excluir um país que possui estados associados.")
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nome


class Estado(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, unique=True)
    uf = models.CharField(max_length=2, validators=[validate_uf])  # Validação adicionada
    id_pais = models.ForeignKey(Pais, on_delete=models.CASCADE)
    status_estado = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        if Cidade.objects.filter(id_estado=self.id).exists():
            raise ValidationError("Não é possível excluir um estado que possui cidades associadas.")
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nome


class Cidade(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, unique=True)
    DDD = models.CharField(max_length=3, validators=[validate_ddd])  # Validação adicionada
    id_estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    status_cidade = models.CharField(max_length=1)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


class CondicaoPagamento(models.Model):
    id_condicao = models.AutoField(primary_key=True)
    condicao = models.CharField(max_length=30, unique=True)
    parcelas = models.PositiveIntegerField()
    taxa = models.DecimalField(max_digits=10, decimal_places=2)
    multa = models.DecimalField(max_digits=10, decimal_places=2)
    desconto = models.DecimalField(max_digits=10, decimal_places=2)
    status_condicao = models.CharField(max_length=1, validators=[validate_status])
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.condicao} - {self.parcelas} parcelas"

    class Meta:
        verbose_name = "Condição de Pagamento"
        verbose_name_plural = "Condições de Pagamento"
        ordering = ['id_condicao']


class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    status_cliente = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')])
    nome = models.CharField(max_length=50)
    sexo = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Feminino')], null=True)
    apelido = models.CharField(max_length=50, null=True, blank=True)
    rg = models.CharField(max_length=30, null=True, blank=True)
    cpf = models.CharField(max_length=11, validators=[validate_cpf], null=True, blank=True)
    cnpj = models.CharField(max_length=14, validators=[validate_cnpj], null=True, blank=True)
    email = models.EmailField(max_length=200, unique=True)
    telefone = models.CharField(max_length=30, null=True, blank=True)
    celular = models.CharField(max_length=30, null=True, blank=True)
    cep = models.CharField(max_length=10)
    endereco = models.CharField(max_length=255)
    numero = models.PositiveIntegerField()
    complemento = models.CharField(max_length=200, null=True, blank=True)
    bairro = models.CharField(max_length=100)
    id_cidade = models.ForeignKey('Cidade', on_delete=models.CASCADE)
    id_condicao_pagamento = models.ForeignKey('CondicaoPagamento', on_delete=models.SET_NULL, null=True, blank=True)
    data_nasc = models.DateField(null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    tipo_cliente = models.CharField(max_length=1, choices=[('F', 'Pessoa Física'), ('J', 'Pessoa Jurídica')])
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} ({'CPF' if self.tipo_cliente == 'F' else 'CNPJ'})"

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ['id_cliente']

class Fornecedor(models.Model):
    id_fornecedor = models.AutoField(primary_key=True)
    status_fornecedor = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')])
    nome_fantasia = models.CharField(max_length=100, unique=True)
    razao_social = models.CharField(max_length=100)
    data_fundacao = models.DateField(null=True, blank=True)
    insc_municipal = models.CharField(max_length=50, null=True, blank=True)
    insc_estadual = models.CharField(max_length=50, null=True, blank=True)
    cpf = models.CharField(max_length=11, validators=[validate_cpf], null=True, blank=True)
    rg = models.CharField(max_length=30, null=True, blank=True)
    cnpj = models.CharField(max_length=14, validators=[validate_cnpj], null=True, blank=True)
    email = models.EmailField(max_length=200, unique=True)
    telefone = models.CharField(max_length=30, null=True, blank=True)
    celular = models.CharField(max_length=30, null=True, blank=True)
    cep = models.CharField(max_length=10)
    endereco = models.CharField(max_length=255)
    numero = models.PositiveIntegerField()
    complemento = models.CharField(max_length=200, null=True, blank=True)
    bairro = models.CharField(max_length=100)
    tipo_fornecedor = models.CharField(max_length=1, choices=[('F', 'Pessoa Física'), ('J', 'Pessoa Jurídica')])
    id_cidade = models.ForeignKey('Cidade', on_delete=models.CASCADE)
    id_condicao_pagamento = models.ForeignKey('CondicaoPagamento', on_delete=models.SET_NULL, null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome_fantasia} ({self.razao_social})"

    class Meta:
        verbose_name = "Fornecedor"
        verbose_name_plural = "Fornecedores"
        ordering = ['id_fornecedor']


class Cargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    status_cargo = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')])
    cargo = models.CharField(max_length=100, unique=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_ult_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cargo

    class Meta:
        verbose_name = "Cargo"
        verbose_name_plural = "Cargos"
        ordering = ['id_cargo']