from django.urls import path
from . import views


app_name = "testing"

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
    # path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
]

