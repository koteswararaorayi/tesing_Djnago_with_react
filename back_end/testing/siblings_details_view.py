from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class SiblingInformation(APIView):
    def post(self, request, format=None):
        # data = JSONParser().parse(request)
        print(request.data)
        query = """
            INSERT INTO SiblingInformation (PersionId, relation, sibling_name, sibling_dob, sibling_marital_status,
                sibling_address, sibling_occupation, sibling_annual_income)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in request.data:
                    person_id = data.get('PersionId')
                    relation = data.get('relation')
                    sibling_name = data.get('siblingName')
                    sibling_dob = data.get('siblingDOB')
                    sibling_marital_status = data.get('maritalStatus')
                    sibling_address = data.get('address')
                    sibling_occupation = data.get('siblingOccupation')
                    sibling_annual_income = data.get('siblingIncome')
                    data = (person_id, relation, sibling_name, sibling_dob, sibling_marital_status,sibling_address, 
                        sibling_occupation, sibling_annual_income)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Sibling information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
