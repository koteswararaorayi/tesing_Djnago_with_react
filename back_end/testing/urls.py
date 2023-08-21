from django.urls import path
from . import views

app_name = "testing"

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
]