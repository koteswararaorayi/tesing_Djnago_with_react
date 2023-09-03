from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse


class PersonalDetails(APIView):
    def post(self,request):
        user = request.user
        user_id = user.id
        FamilyName = request.data["familyName"]
        Name = request.data["givenName"]
        Dob = request.data["dob"]
        EmailId = request.data["email"]
        AlterEmailId = request.data["alternateEmail"]
        PhoneNumber = request.data["phoneNumber"]
        maritalStatus = request.data["maritalStatus"]
        permanentAddress = request.data["permanentAddress"]
        presentAddress = request.data["presentAddress"]
        data=(FamilyName,Name,Dob,EmailId,AlterEmailId,PhoneNumber,maritalStatus,permanentAddress,presentAddress,user_id)
        try:
            query = """ insert into PersonalDetails (FamilyName, Name, Dob,EmailId,AlterEmailId,PhoneNumber,MaritalStatus,PermanentAddress,PresentAddress,created_by) 
            values(%s, %s, %s,%s,%s,%s,%s,%s,%s,%s)"""
            
            with connection.cursor() as cursor:
                cursor.execute(query,data)
                cursor.close()
            
            return JsonResponse({'message': "PersonalDetails successfully Inserted"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)