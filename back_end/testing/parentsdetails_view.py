from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class FamilyInformation(APIView):
    def post(self, request, format=None):
        print(request.data)
        person_id = request.data.get('PersionId')
        father_name = request.data.get('father_name')
        father_dob = request.data.get('father_dob')
        father_address = request.data.get('father_address')
        father_occupation = request.data.get('father_occupation')
        father_annual_income = request.data.get('father_annual_income')
        mother_name = request.data.get('mother_name')
        mother_dob = request.data.get('mother_dob')
        mother_address = request.data.get('mother_address')
        mother_occupation = request.data.get('mother_occupation')
        mother_annual_income = request.data.get('mother_annual_income')
        data = (person_id, father_name, father_dob, father_address, father_occupation,father_annual_income, mother_name, 
            mother_dob, mother_address, mother_occupation,mother_annual_income)
        query = """
            INSERT INTO FamilyInformation (PersionId, father_name, father_dob, father_address, father_occupation,
            father_annual_income, mother_name, mother_dob, mother_address, mother_occupation, mother_annual_income)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                connection.commit()
            return JsonResponse({"message": "Family information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
