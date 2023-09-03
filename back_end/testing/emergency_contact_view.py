from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class EmergencyContact(APIView):
    def post(self, request, format=None):
        # data = JSONParser().parse(request)
        print(request.data)
        person_id = request.data.get('PersionId')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        full_address = request.data.get('address')
        postal_zipcode = request.data.get('postal_zipcode')
        email = request.data.get('email')
        phone_number = request.data.get('phoneNumber')
        relation = request.data.get('relation')
        data = (person_id, first_name, last_name, full_address, postal_zipcode, email, phone_number, relation)
        query = """
            INSERT INTO EmergencyContact (PersionId, first_name, last_name, full_address, postal_zipcode, email, phone_number, relation)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Emergency contact inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
