from django.urls import path
from . import ( views, language_test_view, emergency_contact_view, parentsdetails_view, siblings_details_view)


app_name = "testing"

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('personaldetails/', views.PersonalDetails.as_view(), name="personal_details"),
    path('languagetest/', language_test_view.LanguageTestScore.as_view(), name="language_test"),
    path('emergencycontact/', emergency_contact_view.EmergencyContact.as_view(), name="emergency_contact"),
    path('parentsdetails/', parentsdetails_view.FamilyInformation.as_view(), name="parents_details"),
    path('siblingsdetails/', siblings_details_view.SiblingInformation.as_view(), name="siblings_details"),
]

