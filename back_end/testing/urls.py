from django.urls import path
from . import views


app_name = "testing"

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('personal_details/', views.PersonalDetails.as_view(), name="personal_details"),
    # path('login/', views.user_login, name='login'),
]

