# Generated by Django 4.2.4 on 2023-08-22 08:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0003_remove_customuser_mobile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='last_name',
        ),
    ]
