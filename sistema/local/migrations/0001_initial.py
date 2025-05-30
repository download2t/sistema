# Generated by Django 5.2 on 2025-04-11 13:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('uf', models.CharField(max_length=2)),
                ('status_estado', models.CharField(max_length=1)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_ult_alteracao', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('sigla', models.CharField(max_length=3)),
                ('DDI', models.CharField(max_length=3)),
                ('status_pais', models.CharField(max_length=1)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_ult_alteracao', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Cidade',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('DDD', models.CharField(max_length=3)),
                ('status_cidade', models.CharField(max_length=1)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('data_ult_alteracao', models.DateTimeField(auto_now=True)),
                ('id_estado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='local.estado')),
            ],
        ),
        migrations.AddField(
            model_name='estado',
            name='id_pais',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='local.pais'),
        ),
    ]
