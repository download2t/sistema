import re
from django.core.exceptions import ValidationError

def validate_ddi(value):
    if not re.fullmatch(r"\d{2}", value):
        raise ValidationError("DDI deve conter apenas números e ter exatamente 2 dígitos.")

def validate_sigla(value):
    if not re.fullmatch(r"[A-Z]{3}", value):
        raise ValidationError("Sigla do país deve conter 3 letras maiúsculas.")

def validate_uf(value):
    if not re.fullmatch(r"[A-Z]{2}", value):
        raise ValidationError("UF deve conter 2 letras maiúsculas.")

def validate_ddd(value):
    if not re.fullmatch(r"\d{3}", value):
        raise ValidationError("DDD deve conter apenas números e ter exatamente 3 dígitos.")

def validate_status(value):
    if value not in ['A', 'I']:
        raise ValidationError("Status deve ser 'A' (ativo) ou 'I' (inativo).")

import re
from django.core.exceptions import ValidationError

def validate_cpf(value):
    """Valida um CPF formatado corretamente e verifica seu dígito verificador."""
    value = re.sub(r"\D", "", value)  # Remove pontos e traços
    
    if len(value) != 11 or not value.isdigit():
        raise ValidationError("CPF deve conter exatamente 11 números.")

    if value == value[0] * 11:
        raise ValidationError("CPF inválido (todos os dígitos iguais).")

    # Cálculo do dígito verificador
    def calcular_dv(cpf, peso):
        soma = sum(int(d) * p for d, p in zip(cpf, range(peso, 1, -1)))
        resto = soma % 11
        return "0" if resto < 2 else str(11 - resto)

    if value[9] != calcular_dv(value[:9], 10) or value[10] != calcular_dv(value[:10], 11):
        raise ValidationError("CPF inválido (dígito verificador não corresponde).")

def validate_cnpj(value):
    """Valida um CNPJ formatado corretamente e verifica seu dígito verificador."""
    value = re.sub(r"\D", "", value)  # Remove pontos e traços
    
    if len(value) != 14 or not value.isdigit():
        raise ValidationError("CNPJ deve conter exatamente 14 números.")

    if value == value[0] * 14:
        raise ValidationError("CNPJ inválido (todos os dígitos iguais).")

    # Cálculo do dígito verificador
    def calcular_dv(cnpj, pesos):
        soma = sum(int(d) * p for d, p in zip(cnpj, pesos))
        resto = soma % 11
        return "0" if resto < 2 else str(11 - resto)

    pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    pesos2 = [6] + pesos1

    if value[12] != calcular_dv(value[:12], pesos1) or value[13] != calcular_dv(value[:13], pesos2):
        raise ValidationError("CNPJ inválido (dígito verificador não corresponde).")
