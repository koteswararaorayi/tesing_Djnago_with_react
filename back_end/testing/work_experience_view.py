from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class WorkExperience(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        query = """
        INSERT INTO WorkExperience (PersionId, designation, company_name, location, duration_start, duration_end)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersionId')
                    designation = data.get('designation')
                    company_name = data.get('companyName')
                    location = data.get('location')
                    duration_start = data.get('startDate')
                    duration_end = data.get('endDate')
                    data = (person_id, designation, company_name, location, duration_start, duration_end)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
