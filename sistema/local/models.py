from django.db import models
from django.core.exceptions import ValidationError
import re  # Biblioteca para expressões regulares



# Função de validação para DDI (deve conter apenas números e ter 2 caracteres)
def validate_ddi(value):
    if not re.fullmatch(r"\d{2}", value):
        raise ValidationError("DDI deve conter apenas números e ter exatamente 2 dígitos.")

# Função de validação para sigla do país (deve conter 3 letras maiúsculas)
def validate_sigla(value):
    if not re.fullmatch(r"[A-Z]{3}", value):
        raise ValidationError("Sigla do país deve conter 3 letras maiúsculas.")

# Função de validação para UF do estado (deve conter 2 letras maiúsculas)
def validate_uf(value):
    if not re.fullmatch(r"[A-Z]{2}", value):
        raise ValidationError("UF deve conter 2 letras maiúsculas.")

# Função de validação para DDD (deve conter 3 números)
def validate_ddd(value):
    if not re.fullmatch(r"\d{3}", value):
        raise ValidationError("DDD deve conter apenas números e ter exatamente 3 dígitos.")
    
    # Função de validação para status (apenas 'A' para ativo ou 'I' para inativo)
def validate_status(value):
    if value not in ['A', 'I']:
        raise ValidationError("Status deve ser 'A' (ativo) ou 'I' (inativo).")

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
