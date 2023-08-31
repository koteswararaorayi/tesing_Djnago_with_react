from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class SiblingInformation(APIView):
    def post(self, request, format=None):
        # data = JSONParser().parse(request)
        print(request.data)
        person_id = request.data.get('PersionId')
        relation = request.data.get('relation')
        sibling_name = request.data.get('sibling_name')
        sibling_dob = request.data.get('sibling_dob')
        sibling_marital_status = request.data.get('sibling_marital_status')
        sibling_address = request.data.get('sibling_address')
        sibling_occupation = request.data.get('sibling_occupation')
        sibling_annual_income = request.data.get('sibling_annual_income')
        data = (person_id, relation, sibling_name, sibling_dob, sibling_marital_status,sibling_address, 
            sibling_occupation, sibling_annual_income)
        query = """
            INSERT INTO SiblingInformation (PersionId, relation, sibling_name, sibling_dob, sibling_marital_status,
                sibling_address, sibling_occupation, sibling_annual_income)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Sibling information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
