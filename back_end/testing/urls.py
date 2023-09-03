from django.urls import path
from . import views
from . import language_test_view
from . import emergency_contact_view
from . import parentsdetails_view
from . import siblings_details_view
from . import programs_interested_view
from . import visa_refusals_view
from . import canada_immigration_info_view
from . import international_travel_history_view
from . import personal_details_view
from . import work_experience_view

app_name = "testing"

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('personaldetails/', personal_details_view.PersonalDetails.as_view(), name="personal_details"),
    path('languagetest/', language_test_view.LanguageTestScore.as_view(), name="language_test"),
    path('emergencycontact/', emergency_contact_view.EmergencyContact.as_view(), name="emergency_contact"),
    path('parentsdetails/', parentsdetails_view.FamilyInformation.as_view(), name="parents_details"),
    path('siblingsdetails/', siblings_details_view.SiblingInformation.as_view(), name="siblings_details"),
    path('programsinterested/', programs_interested_view.InterestedPrograms.as_view(), name="programs_interested"),
    path('visarefusals/', visa_refusals_view.VisaRefusals.as_view(), name="visa_refusals"),
    path('canadaimmigrationinfo/', canada_immigration_info_view.CanadaImmigrationInfo.as_view(), name="canada_immigration_info"),
    path('internationaltravelhistory/', international_travel_history_view.TravelHistory.as_view(), name="international_travel_history"),
    path('workexperience/', work_experience_view.WorkExperience.as_view(), name="work_experience"),
]

